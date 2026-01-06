import { useRef, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useRepositories } from "@/hooks/use-repositories";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { User } from "@/lib/data/interfaces";
import { Button } from "@/components/ui/button";

const MyIDCard = () => {
    const navigate = useNavigate();
    const { authRepository } = useRepositories();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const currentUser = await authRepository.getCurrentUser();
            if (!currentUser) {
                navigate("/auth");
                return;
            }
            setUser(currentUser);
        };
        loadUser();
    }, [authRepository, navigate]);

    if (!user) return null;

    // QR Data
    const qrData = JSON.stringify({
        id: user.id,
        name: user.nama,
        nim: user.nim
    });

    return (
        <div className="p-4 space-y-6 flex flex-col items-center">
            {/* Header */}
            <div className="w-full flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-extrabold text-foreground">KARTU TANDA ANGGOTA</h1>
            </div>

            {/* ID Card Container - Textured Paper Look */}
            <div className="relative w-full max-w-[340px] aspect-[3/5] bg-[#FFFBF0] rounded-xl overflow-hidden shadow-xl border-2 border-black/10">

                {/* Grid Background */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                />

                {/* Crumpled Paper Texture Overlay (CSS simulated) */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-black/5 mix-blend-overlay pointer-events-none" />

                {/* Stickers / Decorations */}





                {/* Content Container */}
                <div className="relative z-0 h-full flex flex-col p-6">

                    {/* Title */}
                    <h2 className="text-2xl font-black text-red-600 mb-6 text-center tracking-wide" style={{ textShadow: '1px 1px 0 #000' }}>
                        KARTU TANDA<br />ANGGOTA
                    </h2>

                    {/* QR Code Section */}
                    <div className="bg-white p-3 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mx-auto mb-6 transform -rotate-1">
                        <QRCode
                            value={qrData}
                            size={180}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            viewBox={`0 0 256 256`}
                        />
                    </div>

                    {/* User Details */}
                    <div className="space-y-4 font-bold text-gray-800 text-sm mt-auto pb-10 px-2">
                        <div className="grid grid-cols-[80px_10px_1fr]">
                            <span>Nama</span>
                            <span>:</span>
                            <span className="uppercase text-black">{user.nama}</span>
                        </div>
                        <div className="grid grid-cols-[80px_10px_1fr]">
                            <span>NIM</span>
                            <span>:</span>
                            <span>{user.nim}</span>
                        </div>
                        <div className="grid grid-cols-[80px_10px_1fr]">
                            <span>Amanah</span>
                            <span>:</span>
                            <span>{user.jabatan || "-"}</span>
                        </div>
                        <div className="grid grid-cols-[80px_10px_1fr]">
                            <span>Divisi</span>
                            <span>:</span>
                            <span>{user.divisi || "-"}</span>
                        </div>

                    </div>

                    {/* Footer text */}
                    <div className="absolute bottom-4 right-4 font-black text-red-600 text-sm tracking-widest">
                        AL-FATH PUSAT
                    </div>

                </div>
            </div>

            {/* Download Button */}
            <Button className="w-full max-w-sm mt-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-white text-black hover:bg-gray-50 rounded-xl h-12">
                <Download className="w-5 h-5 mr-2" />
                Simpan Kartu
            </Button>
        </div>

    );
};

export default MyIDCard;
