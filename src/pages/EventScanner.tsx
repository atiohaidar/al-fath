import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useRepositories } from "@/hooks/use-repositories";
import { toast } from "sonner";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";

const EventScanner = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { eventRepository, authRepository } = useRepositories();
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [lastScannedId, setLastScannedId] = useState<number | null>(null);
    const [paused, setPaused] = useState(false);

    const eventId = id ? parseInt(id) : 0;

    const handleScan = async (result: any, error: any) => {
        if (paused) return;

        if (result) {
            const data = result?.text;
            if (data && data !== scanResult) {
                setScanResult(data);
                processScan(data);
            }
        }

        // Ignore errors for continuous scanning
    };

    const processScan = async (data: string) => {
        setPaused(true);
        try {
            const parsed = JSON.parse(data);
            const userId = parsed.id;

            if (!userId) throw new Error("Invalid QR Code");

            if (userId === lastScannedId) {
                toast.warning("User ini baru saja di-scan");
                setTimeout(() => setPaused(false), 2000);
                return;
            }

            const success = await eventRepository.checkInUser(eventId, userId);

            if (success) {
                // Get user info for feedback
                const user = await ((authRepository as any).db?.users.get(userId)); // Direct DB access hack if needed, or implement getUser
                const userName = user?.nama || parsed.name || "Peserta";

                toast.success(`Berhasil check-in: ${userName}`);
                setLastScannedId(userId);
            } else {
                toast.warning("User sudah absen sebelumnya");
            }

        } catch (error) {
            console.error(error);
            toast.error("QR Code tidak valid");
        }

        // Resume scanning after delay
        setTimeout(() => {
            setPaused(false);
            setScanResult(null);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Header */}
            <div className="p-4 flex items-center justify-between bg-black/50 backdrop-blur-md absolute top-0 left-0 right-0 z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"
                >
                    <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <h1 className="font-bold text-lg">Scan Presensi</h1>
                <div className="w-10" />
            </div>

            {/* Scanner View */}
            <div className="flex-1 flex flex-col justify-center relative overflow-hidden">
                <QrReader
                    onResult={handleScan}
                    constraints={{ facingMode: 'environment' }}
                    className="w-full h-full object-cover"
                    videoContainerStyle={{ height: '100%', paddingTop: 0 }}
                    videoStyle={{ height: '100%', objectFit: 'cover' }}
                />

                {/* Overlay Guide */}
                <div className="absolute inset-0 border-[50px] border-black/50 flex items-center justify-center">
                    <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-alfath-yellow rounded-tl-xl -mt-1 -ml-1" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-alfath-yellow rounded-tr-xl -mt-1 -mr-1" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-alfath-yellow rounded-bl-xl -mb-1 -ml-1" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-alfath-yellow rounded-br-xl -mb-1 -mr-1" />
                    </div>
                </div>

                {/* Status Indicator */}
                {paused && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20 backdrop-blur-sm">
                        <div className="scale-125 transition-transform duration-300">
                            <CheckCircle className="w-20 h-20 text-green-500" />
                        </div>
                    </div>
                )}
            </div>

            {/* Hint */}
            <div className="p-6 bg-black pb-10">
                <p className="text-center text-gray-400 text-sm">
                    Arahkan kamera ke QR Code peserta untuk mencatat kehadiran.
                </p>
            </div>
        </div>
    );
};

export default EventScanner;
