import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useRepositories } from "@/hooks/use-repositories";
import { toast } from "sonner";

const EventScanner = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { eventRepository, authRepository } = useRepositories();
    const [lastScannedId, setLastScannedId] = useState<number | null>(null);
    const [paused, setPaused] = useState(false);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const isProcessingRef = useRef(false);

    const eventId = id ? parseInt(id) : 0;

    useEffect(() => {
        let isScannerStarted = false;

        const startScanner = async () => {
            try {
                // Check if element exists before starting
                const readerElement = document.getElementById("reader");
                if (!readerElement) return;

                const html5QrCode = new Html5Qrcode("reader");
                scannerRef.current = html5QrCode;

                const config = {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0
                };

                await html5QrCode.start(
                    { facingMode: "environment" },
                    config,
                    (decodedText) => {
                        if (!isProcessingRef.current) {
                            processScan(decodedText);
                        }
                    },
                    () => {
                        // Error callback (scan fail), ignore for continuous
                    }
                );
                isScannerStarted = true;
            } catch (err) {
                console.error("Unable to start scanner", err);
                // Only show toast if it's not a common "not found" or "already started" error
                if (!(err instanceof Error) || !err.message.includes("is not running")) {
                    toast.error("Gagal mengakses kamera");
                }
            }
        };

        startScanner();

        return () => {
            const cleanup = async () => {
                if (scannerRef.current && isScannerStarted) {
                    try {
                        const state = scannerRef.current.getState();
                        // Only stop if it's actually running (state 2 is SCANNING)
                        if (state === 2) {
                            await scannerRef.current.stop();
                        }
                        scannerRef.current.clear();
                    } catch (err) {
                        console.warn("Cleanup warning:", err);
                    }
                }
            };
            cleanup();
        };
    }, []);

    const processScan = async (data: string) => {
        isProcessingRef.current = true;
        setPaused(true);
        try {
            const parsed = JSON.parse(data);
            const userId = Number(parsed.id);

            if (!userId) throw new Error("Invalid QR Code");

            if (userId === lastScannedId) {
                toast.warning("User ini baru saja di-scan");
                setTimeout(() => {
                    setPaused(false);
                    isProcessingRef.current = false;
                }, 2000);
                return;
            }

            const success = await eventRepository.checkInUser(eventId, userId);

            if (success) {
                const user = await authRepository.getUser(userId);
                const userName = user?.nama || parsed.name || `User ${userId}`;

                toast.success(`Berhasil check-in: ${userName}`);
                setLastScannedId(userId);
            } else {
                toast.warning("User sudah absen sebelumnya atau data tidak valid");
            }

        } catch (error) {
            console.error("Scan processing error:", error);
            toast.error("QR Code tidak valid");
        }

        // Resume scanning after delay
        setTimeout(() => {
            setPaused(false);
            isProcessingRef.current = false;
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Header */}
            <div className="p-4 flex items-center justify-between bg-black/50 backdrop-blur-md absolute top-0 left-0 right-0 z-50">
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
            <div className="flex-1 flex flex-col justify-center relative overflow-hidden bg-black">
                {/* HTML5 QR Code Reader Container */}
                <div id="reader" className="w-full h-full [&>video]:object-cover [&>video]:h-full"></div>

                {/* Overlay Guide */}
                <div className="absolute inset-0 border-[50px] border-black/50 flex items-center justify-center pointer-events-none z-10">
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
                            <CheckCircle className="w-20 h-20 text-success" />
                        </div>
                    </div>
                )}
            </div>

            {/* Hint */}
            <div className="p-6 bg-black pb-10 z-30">
                <p className="text-center text-gray-400 text-sm">
                    Arahkan kamera ke QR Code peserta untuk mencatat kehadiran.
                </p>
            </div>
        </div>
    );
};

export default EventScanner;
