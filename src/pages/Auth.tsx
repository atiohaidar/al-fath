import { useState } from "react";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRepositories } from "@/hooks/use-repositories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/lib/routes";

type AuthMode = "login" | "register";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const { authRepository } = useRepositories();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nama: "",
    nim: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (mode === "login") {
        const user = await authRepository.login(formData.email, formData.password);
        if (user) {
          const userId = user.id ? parseInt(user.id) : 0;
          await (authRepository as any).setSession(userId);
          toast.success("Berhasil masuk!");
          navigate(ROUTES.APP.HOME);
        } else {
          toast.error("Email atau password salah");
        }
      } else {
        await authRepository.register({
          email: formData.email,
          password: formData.password,
          nama: formData.nama,
          nim: formData.nim,
          divisi: "Anggota Baru",
          tingkatKader: "Kader Muda",
          generasi: "Gen 13",
          jabatan: "Anggota",
          avatar: null
        });
        toast.success("Registrasi berhasil! Silakan masuk.");
        setMode("login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col justify-center max-w-md mx-auto">
      {/* Logo/Header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-card border-playful-thick rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-playful-lg relative overflow-hidden">
          <img src="/logo.png" alt="Logo Al-Fath" className="w-full h-full object-contain p-2" />
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">Al Fath App</h1>
        <p className="text-muted-foreground mt-1">Lebih Dekat, Lebih Bersahabat</p>
      </div>

      {/* Toggle Tabs */}
      <div className="flex gap-2 p-1 bg-muted rounded-2xl mb-6">
        <Button
          type="button"
          onClick={() => setMode("login")}
          variant={mode === "login" ? "gradient-primary" : "ghost"}
          className="flex-1"
        >
          Masuk
        </Button>
        <Button
          type="button"
          onClick={() => setMode("register")}
          variant={mode === "register" ? "gradient-primary" : "ghost"}
          className="flex-1"
        >
          Daftar
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Nama Lengkap</label>
              <Input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">NIM</label>
              <Input
                type="text"
                placeholder="Masukkan NIM"
                value={formData.nim}
                onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                required
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Email</label>
          <Input
            type="email"
            placeholder="Masukkan email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mode === "login" && (
          <button type="button" className="text-sm text-secondary font-semibold">
            Lupa password?
          </button>
        )}

        <Button
          type="submit"
          variant="gradient-primary"
          size="lg"
          className="w-full"
        >
          {mode === "login" ? (
            <>
              <LogIn className="w-5 h-5" />
              Masuk
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              Daftar
            </>
          )}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-muted-foreground mt-8">
        {mode === "login" ? "Belum punya akun? " : "Sudah punya akun? "}
        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="font-bold text-secondary"
        >
          {mode === "login" ? "Daftar sekarang" : "Masuk"}
        </button>
      </p>
    </div>
  );
};

export default Auth;
