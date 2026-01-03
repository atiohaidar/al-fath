import { X, Calendar, Clock, MapPin, Users, Globe } from "lucide-react";
import { Event } from "@/lib/data/interfaces";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EventDetailDialogProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event | null;
}

const EventDetailDialog = ({ isOpen, onClose, event }: EventDetailDialogProps) => {
    if (!isOpen || !event) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-card w-full max-w-lg rounded-3xl border-playful-thick overflow-hidden animate-pop-in relative">
                {/* Banner Area */}
                <div className="h-40 bg-muted relative">
                    {event.banner ? (
                        <img src={event.banner} alt={event.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full gradient-primary flex items-center justify-center">
                            <Globe className="w-16 h-16 text-white/30" />
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-4">
                        <Badge variant="playful-yellow">
                            {event.category || "Umum"}
                        </Badge>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <div>
                        <h2 className="text-2xl font-extrabold text-foreground leading-tight">{event.title}</h2>
                        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                            {event.description || "Tidak ada deskripsi tambahan untuk kegiatan ini."}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center border-playful-sm flex-shrink-0">
                                <Calendar className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Tanggal</p>
                                <p className="text-sm font-bold text-foreground">{format(new Date(event.date), "EEEE, d MMM yyyy", { locale: id })}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center border-playful-sm flex-shrink-0">
                                <Clock className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Waktu</p>
                                <p className="text-sm font-bold text-foreground">{event.time} WIB</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center border-playful-sm flex-shrink-0">
                                <MapPin className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Lokasi</p>
                                <p className="text-sm font-bold text-foreground truncate w-24">{event.location}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center border-playful-sm flex-shrink-0">
                                <Users className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Peserta</p>
                                <p className="text-sm font-bold text-foreground">{event.participants_count || 0} Terdaftar</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-dashed border-border flex gap-3">
                        <Button
                            className="flex-1 rounded-2xl font-bold btn-pop gradient-green py-6 shadow-playful"
                        >
                            Daftar Sekarang
                        </Button>
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="rounded-2xl font-bold border-2 border-foreground py-6 flex-shrink-0"
                        >
                            Tutup
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailDialog;
