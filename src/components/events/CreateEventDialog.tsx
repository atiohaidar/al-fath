import { useState, useEffect } from "react";
import { X, Calendar, Clock, MapPin, Check } from "lucide-react";
import { useRepositories } from "@/hooks/use-repositories";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/data/interfaces";

interface CreateEventDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    creatorId: number;
    event?: Event | null; // Optional event for editing
}

const CreateEventDialog = ({ isOpen, onClose, onSuccess, creatorId, event }: CreateEventDialogProps) => {
    const { eventRepository } = useRepositories();
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        time: "",
        end_time: "",
        location: "",
        description: "",
        category: "Kajian",
    });

    useEffect(() => {
        if (event) {
            setFormData({
                title: event.title,
                date: event.date,
                time: event.time,
                end_time: event.end_time || "",
                location: event.location,
                description: event.description,
                category: event.category || "Kajian",
            });
        } else {
            setFormData({
                title: "", date: "", time: "", end_time: "", location: "", description: "", category: "Kajian"
            });
        }
    }, [event, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (event && event.id) {
                // EDIT MODE
                await eventRepository.updateEvent(event.id, {
                    ...formData,
                    creatorId: event.creatorId, // Keep original creator
                });
                toast.success("Event berhasil diperbarui!");
            } else {
                // CREATE MODE
                await eventRepository.createEvent({
                    ...formData,
                    creatorId,
                });
                toast.success("Event berhasil dibuat!");
            }

            setFormData({
                title: "", date: "", time: "", end_time: "", location: "", description: "", category: "Kajian"
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to save event", error);
            toast.error("Gagal menyimpan event");
        }
    };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="card-pop p-5 max-w-md w-full max-h-[90vh] overflow-y-auto w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-extrabold text-foreground">{event ? "Edit Event" : "Buat Event Baru"}</h2>
                    <button onClick={onClose} className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Judul Event</label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Contoh: Kajian Rutin Bulanan"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Tanggal</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="pl-9"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <label className="text-sm font-semibold">Waktu Mulai</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    className="pl-9"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2 col-span-2 sm:col-span-1">
                            <label className="text-sm font-semibold">Waktu Selesai</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                <Input
                                    type="time"
                                    value={formData.end_time || ""}
                                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Lokasi</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Input
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="pl-9"
                                placeholder="Contoh: Masjid Al-Fath"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Deskripsi</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full p-3 bg-card border-playful rounded-xl font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                            placeholder="Deskripsi singkat event..."
                        />
                    </div>

                    <Button type="submit" variant="gradient-primary" size="lg" className="w-full">
                        <Check className="w-5 h-5 mr-2" />
                        {event ? "Simpan Perubahan" : "Buat Event"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateEventDialog;
