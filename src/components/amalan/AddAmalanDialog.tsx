import { useState } from "react";
import { X, Plus } from "lucide-react";
import { useRepositories } from "@/hooks/use-repositories";
import { toast } from "sonner";

interface AddAmalanDialogProps {
    isOpen: boolean;
    onClose: () => void;
    date: string;
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

const AddAmalanDialog = ({ isOpen, onClose, date, onSuccess }: AddAmalanDialogProps) => {
    const { amalanRepository } = useRepositories();
    const [formData, setFormData] = useState({
        name: "",
        category: "Lainnya",
        time: "",
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await amalanRepository.addAmalan({
                name: formData.name,
                category: formData.category,
                completed: false,
                time: formData.time || undefined,
                date,
            });

            toast.success("Amalan berhasil ditambahkan!");
            setFormData({ name: "", category: "Lainnya", time: "" });
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to add amalan", error);
            toast.error("Gagal menambahkan amalan");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="card-pop p-5 max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-extrabold text-foreground">Tambah Amalan</h2>
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

                    <button
                        type="submit"
                        className="w-full py-3 gradient-yellow border-playful rounded-xl font-bold flex items-center justify-center gap-2 btn-pop shadow-playful text-alfath-dark"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Amalan
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAmalanDialog;
