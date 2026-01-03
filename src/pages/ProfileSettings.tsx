import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Lock } from "lucide-react";
import { useRepositories } from "@/hooks/use-repositories";
import { User } from "@/lib/data/interfaces";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";

const ProfileSettings = () => {
    const navigate = useNavigate();
    const { authRepository } = useRepositories();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Personal Info Form
    const [personalInfo, setPersonalInfo] = useState({
        nama: "",
        nim: "",
        divisi: "",
        tingkatKader: "",
        generasi: "",
        jabatan: "",
    });

    // Password Form
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    useEffect(() => {
        const loadUser = async () => {
            try {
                const currentUser = await authRepository.getCurrentUser();
                if (!currentUser) {
                    navigate("/auth");
                    return;
                }
                setUser(currentUser);
                setPersonalInfo({
                    nama: currentUser.nama || "",
                    nim: currentUser.nim || "",
                    divisi: currentUser.divisi || "",
                    tingkatKader: currentUser.tingkatKader || "",
                    generasi: currentUser.generasi || "",
                    jabatan: currentUser.jabatan || "",
                });
            } catch (error) {
                console.error("Failed to load user", error);
                toast.error("Gagal memuat data profil");
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [authRepository, navigate]);

    const handleSavePersonalInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;

        try {
            const userId = parseInt(user.id);
            await authRepository.updateUser(userId, personalInfo);

            // Refresh user data
            const updatedUser = await authRepository.getCurrentUser();
            setUser(updatedUser);

            toast.success("Profil berhasil diperbarui!");
        } catch (error) {
            console.error("Failed to update profile", error);
            toast.error("Gagal memperbarui profil");
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error("Password baru tidak cocok!");
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            toast.error("Password minimal 6 karakter!");
            return;
        }

        try {
            const userId = parseInt(user.id);
            const success = await authRepository.updatePassword(
                userId,
                passwordForm.oldPassword,
                passwordForm.newPassword
            );

            if (success) {
                toast.success("Password berhasil diubah!");
                setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                toast.error("Password lama salah!");
            }
        } catch (error) {
            console.error("Failed to change password", error);
            toast.error("Gagal mengubah password");
        }
    };

    if (loading) return null;
    if (!user) return null;

    return (
        <AppLayout>
            <div className="p-4 space-y-5">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/app/profile")}
                        className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-extrabold text-foreground">Pengaturan Profil</h1>
                </div>

                {/* Personal Info Section */}
                <div className="card-pop p-5">
                    <h2 className="text-lg font-bold text-foreground mb-4">Informasi Pribadi</h2>
                    <form onSubmit={handleSavePersonalInfo} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">Nama Lengkap</label>
                            <Input
                                type="text"
                                value={personalInfo.nama}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, nama: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">NIM</label>
                            <Input
                                type="text"
                                value={personalInfo.nim}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, nim: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">Divisi</label>
                            <Input
                                type="text"
                                value={personalInfo.divisi}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, divisi: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Tingkat Kader</label>
                                <Input
                                    type="text"
                                    value={personalInfo.tingkatKader}
                                    onChange={(e) => setPersonalInfo({ ...personalInfo, tingkatKader: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Generasi</label>
                                <Input
                                    type="text"
                                    value={personalInfo.generasi}
                                    onChange={(e) => setPersonalInfo({ ...personalInfo, generasi: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">Jabatan</label>
                            <Input
                                type="text"
                                value={personalInfo.jabatan}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, jabatan: e.target.value })}
                            />
                        </div>

                        <Button type="submit" variant="gradient-primary" size="lg" className="w-full">
                            <Save className="w-5 h-5 mr-2" />
                            Simpan Perubahan
                        </Button>
                    </form>
                </div>

                {/* Password Section */}
                <div className="card-pop p-5">
                    <h2 className="text-lg font-bold text-foreground mb-4">Keamanan</h2>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">Password Lama</label>
                            <Input
                                type="password"
                                value={passwordForm.oldPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">Password Baru</label>
                            <Input
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">Konfirmasi Password Baru</label>
                            <Input
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                required
                            />
                        </div>

                        <Button type="submit" variant="gradient-blue" size="lg" className="w-full">
                            <Lock className="w-5 h-5 mr-2" />
                            Ubah Password
                        </Button>
                    </form>
                </div>

                {/* Info */}
                <div className="card-pop p-4 bg-gradient-to-br from-alfath-yellow/10 to-alfath-blue/10">
                    <p className="text-sm text-center text-muted-foreground">
                        💡 Perubahan data akan tersimpan lokal di perangkat ini. Login untuk sinkronisasi ke cloud.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
};

export default ProfileSettings;
