import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle, User as UserIcon } from "lucide-react";
import { useRepositories } from "@/hooks/use-repositories";
import { Event, User } from "@/lib/data/interfaces";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "sonner";
import QRCode from "react-qr-code";

const EventAttendance = () => {
    const { id: eventId } = useParams();
    const navigate = useNavigate();
    const { eventRepository, authRepository } = useRepositories();
    const [event, setEvent] = useState<Event | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const parsedEventId = eventId ? parseInt(eventId) : 0;

    useEffect(() => {
        const loadData = async () => {
            try {
                const [eventData, user] = await Promise.all([
                    eventRepository.getEvent(parsedEventId),
                    authRepository.getCurrentUser()
                ]);
                setEvent(eventData || null);
                setCurrentUser(user);

                if (user && eventData) {
                    const checkedIn = await eventRepository.isUserCheckedIn(parsedEventId, user.id || 0);
                    setIsCheckedIn(checkedIn);
                }
            } catch (error) {
                console.error("Failed to load event data", error);
                toast.error("Gagal memuat data event");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [parsedEventId, eventRepository, authRepository]);

    const handleCheckIn = async () => {
        if (!currentUser || !event) return;

        try {
            const success = await eventRepository.checkInUser(parsedEventId, currentUser.id || 0);
            if (success) {
                setIsCheckedIn(true);
                toast.success("Berhasil check-in!");
            } else {
                toast.warning("Anda sudah check-in sebelumnya");
            }
        } catch (error) {
            console.error("Check-in error:", error);
            toast.error("Gagal melakukan check-in");
        }
    };

    // Generate QR data for scanner
    const qrData = currentUser ? JSON.stringify({
        id: currentUser.id,
        name: currentUser.nama,
        nim: currentUser.nim
    }) : "";

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-background p-4">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="font-bold text-lg">Presensi</h1>
                </div>
                <Card variant="playful" className="p-8 text-center">
                    <XCircle className="w-16 h-16 mx-auto mb-4 text-destructive" />
                    <h2 className="text-xl font-bold mb-2">Event Tidak Ditemukan</h2>
                    <p className="text-muted-foreground">Event yang Anda cari tidak tersedia.</p>
                    <Button
                        variant="gradient-primary"
                        className="mt-4"
                        onClick={() => navigate(-1)}
                    >
                        Kembali
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="p-4 flex items-center gap-4 border-b">
                <button
                    onClick={() => navigate(-1)}
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="font-bold text-lg">Presensi</h1>
                    <p className="text-sm text-muted-foreground">{event.title}</p>
                </div>
            </div>

            <div className="p-4 space-y-5">
                {/* Event Info Card */}
                <Card variant="playful" className="p-5">
                    <h2 className="font-extrabold text-xl mb-2">{event.title}</h2>
                    <div className="text-sm text-muted-foreground space-y-1">
                        <p>📅 {format(new Date(event.date), "EEEE, d MMMM yyyy", { locale: id })}</p>
                        <p>🕐 {event.time} {event.end_time ? `- ${event.end_time}` : ""} WIB</p>
                        <p>📍 {event.location}</p>
                    </div>
                </Card>

                {/* User Info */}
                <Card variant="playful" className="p-5">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 gradient-yellow border-playful rounded-xl flex items-center justify-center">
                            {currentUser?.avatar ? (
                                <img src={currentUser.avatar} alt="Avatar" className="w-full h-full rounded-xl object-cover" />
                            ) : (
                                <UserIcon className="w-7 h-7 text-alfath-dark" />
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg">{currentUser?.nama || "Tamu"}</h3>
                            <p className="text-sm text-muted-foreground">{currentUser?.nim || "-"}</p>
                        </div>
                    </div>
                </Card>

                {/* QR Code / Status */}
                <Card variant="playful" className="p-6">
                    {isCheckedIn ? (
                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 gradient-green border-playful rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-xl text-green-600">Sudah Hadir!</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Anda sudah tercatat hadir pada kegiatan ini.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-4">
                            <h3 className="font-bold text-lg">QR Code Anda</h3>
                            <p className="text-sm text-muted-foreground">
                                Tunjukkan QR code ini kepada panitia untuk presensi, atau tekan tombol di bawah.
                            </p>
                            <div className="bg-white p-4 rounded-xl inline-block shadow-playful border-playful">
                                <QRCode value={qrData} size={180} />
                            </div>
                            <Button
                                variant="gradient-green"
                                size="lg"
                                className="w-full mt-4"
                                onClick={handleCheckIn}
                            >
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Check-in Sekarang
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default EventAttendance;
