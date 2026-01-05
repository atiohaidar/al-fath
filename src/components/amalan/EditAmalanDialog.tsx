import { useState, useEffect } from "react";
import { X, Save, Trash2 } from "lucide-react";
import { useRepositories } from "@/hooks/use-repositories";
import { Amalan } from "@/lib/data/interfaces";
import { toast } from "sonner";

interface EditAmalanDialogProps {
    isOpen: boolean;
    onClose: () => void;
    amalan: Amalan | null;
    onSuccess: () => void;
}

const categoryOptions = [
    "Sholat Wajib",
    "Sholat Sunnah",
    "Al-Quran",
    "Dzikir",
    "Amal",
    "Puasa",
    "Lainnya"
];

const EditAmalanDialog = ({ isOpen, onClose, amalan, onSuccess }: EditAmalanDialogProps) => {
    const { amalanRepository } = useRepositories();
    const [formData, setFormData] = useState({
        name: "",
        category: "Lainnya",
        time: "",
    });

    useEffect(() => {
        if (amalan) {
            setFormData({
                name: amalan.name,
                category: amalan.category,
                time: amalan.time || "",
            });
        }
    }, [amalan]);

    if (!isOpen || !amalan) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await amalanRepository.updateAmalan(amalan.id!, {
                name: formData.name,
                category: formData.category,
                time: formData.time || undefined,
            });

            toast.success("Amalan berhasil diupdate!");
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to update amalan", error);
            toast.error("Gagal mengupdate amalan");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Yakin ingin menghapus amalan ini?")) return;

        try {
            await amalanRepository.deleteAmalan(amalan.id!);
            toast.success("Amalan berhasil dihapus!");
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to delete amalan", error);
            toast.error("Gagal menghapus amalan");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="card-pop p-5 max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-extrabold text-foreground">Edit Amalan</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Nama Amalan</label>
                        <input
                            type="text"
                            placeholder="Contoh: Sholat Dhuha"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 bg-card border-playful rounded-xl font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Kategori</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full p-3 bg-card border-playful rounded-xl font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {categoryOptions.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Waktu (Opsional)</label>
                        <input
                            type="time"
                            value={formData.time}
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            className="w-full p-3 bg-card border-playful rounded-xl font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="flex-1 py-3 gradient-green border-playful rounded-xl font-bold flex items-center justify-center gap-2 btn-pop shadow-playful text-success-foreground"
                        >
                            <Save className="w-5 h-5" />
                            Simpan
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="py-3 px-4 bg-destructive border-playful rounded-xl font-bold flex items-center justify-center gap-2 btn-pop shadow-playful text-destructive-foreground"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAmalanDialog;
