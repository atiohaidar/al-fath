import { useState } from "react";
import { Eye, EyeOff, LogIn, UserPlus, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type AuthMode = "login" | "register";

const Auth = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nama: "",
    nim: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock auth - nanti akan diganti dengan backend
    if (mode === "login") {
      toast.success("Berhasil masuk!");
      navigate("/");
    } else {
      toast.success("Registrasi berhasil! Silakan masuk.");
      setMode("login");
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col justify-center max-w-md mx-auto">
      {/* Logo/Header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 gradient-yellow border-playful-thick rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-playful-lg relative">
          <Sparkles className="w-12 h-12 text-alfath-dark" />
          <div className="absolute -right-2 -top-2 w-8 h-8 bg-alfath-red rounded-full border-playful" />
          <div className="absolute -left-2 -bottom-2 w-6 h-6 bg-alfath-blue rounded-lg border-playful rotate-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-foreground">Al Fath App</h1>
        <p className="text-muted-foreground mt-1">Dakwah in an Aesthetic Way</p>
      </div>

      {/* Toggle Tabs */}
      <div className="flex gap-2 p-1 bg-muted rounded-2xl mb-6">
        <button
          onClick={() => setMode("login")}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
            mode === "login"
              ? "gradient-yellow border-playful shadow-playful-sm"
              : "text-muted-foreground"
          }`}
        >
          Masuk
        </button>
        <button
          onClick={() => setMode("register")}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
            mode === "register"
              ? "gradient-yellow border-playful shadow-playful-sm"
              : "text-muted-foreground"
          }`}
        >
          Daftar
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "register" && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Nama Lengkap</label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full p-4 bg-card border-playful rounded-xl font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">NIM</label>
              <input
                type="text"
                placeholder="Masukkan NIM"
                value={formData.nim}
                onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                className="w-full p-4 bg-card border-playful rounded-xl font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Email</label>
          <input
            type="email"
            placeholder="Masukkan email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-4 bg-card border-playful rounded-xl font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-4 pr-12 bg-card border-playful rounded-xl font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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

        <button
          type="submit"
          className="w-full py-4 gradient-yellow border-playful-thick rounded-xl font-bold text-lg flex items-center justify-center gap-2 btn-pop shadow-playful text-alfath-dark"
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
        </button>
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
