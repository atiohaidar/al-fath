import { useState, useEffect } from "react";
import {
  User as UserIcon, Settings, LogOut, ChevronRight,
  History, Award, Calendar, Briefcase, LogIn
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRepositories } from "@/hooks/use-repositories";
import { User } from "@/lib/data/interfaces";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";


const menuItems = [
  {
    icon: History,
    title: "Riwayat Generasi",
    path: ROUTES.APP.PROFILE_RIWAYAT_GEN,
    requiresAuth: true,
    color: "gradient-yellow",
  },
  {
    icon: Briefcase,
    title: "Riwayat Kepanitiaan",
    path: ROUTES.APP.PROFILE_RIWAYAT_PANITIA,
    requiresAuth: true,
    color: "gradient-blue",
  },
  {
    icon: Calendar,
    title: "Riwayat Kegiatan",
    path: ROUTES.APP.PROFILE_RIWAYAT_KEGIATAN,
    requiresAuth: true,
    color: "gradient-green",
  },
  {
    icon: Award,
    title: "Statistik Amalan",
    path: ROUTES.APP.PROFILE_STATISTIK,
    requiresAuth: true,
    color: "gradient-red",
  },
  {
    icon: Settings,
    title: "Pengaturan",
    path: ROUTES.APP.PROFILE_SETTINGS,
    requiresAuth: true,
    color: "bg-gray-800", // Dark background for settings to support white icon
  },
];

const Profile = () => {
  const navigate = useNavigate();
  const { authRepository } = useRepositories();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await authRepository.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [authRepository]);

  const handleLogout = async () => {
    await authRepository.logout();
    setUser(null);
    toast.info("Anda telah logout");
  };

  const handleLogin = () => {
    navigate(ROUTES.AUTH);
  };

  if (loading) return null;

  // Guest Mode UI
  if (!user) {
    return (

      <div className="p-4 space-y-5">
        <Card className="p-6 border-playful-thick bg-[#FFFDF5] relative overflow-hidden mt-6">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <UserIcon className="w-32 h-32 text-primary" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-yellow-300 rounded-full opacity-20 blur-xl"></div>

          <div className="relative z-10 text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-2xl border-playful flex items-center justify-center mx-auto transform -rotate-3">
              <LogIn className="w-8 h-8 text-primary" />
            </div>

            <div>
              <h3 className="text-xl font-black text-foreground mb-2">
                Login Sekarang!!!
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">
                Anda Sepertinya belum login
              </p>
            </div>

            <Button
              onClick={handleLogin}
              variant="gradient-primary"
              size="lg"
              className="w-full text-lg h-12 shadow-playful hover:translate-y-[-2px] hover:shadow-playful-lg transition-all"
            >
              Masuk Sekarang
            </Button>

            <p className="text-xs text-muted-foreground mt-4">
              Syarat Keterntuan harusnya berlaku
            </p>
          </div>
        </Card>
      </div>

    );
  }

  // Logged-in User UI
  return (

    <div className="p-4 space-y-5">
      {/* Profile Card */}
      <Card variant="playful" className="p-5 relative overflow-hidden">
        {/* Decorative assets */}
        <img
          src="/assets/playful/Star/Kuning.png"
          alt=""
          className="absolute -right-8 -top-8 w-32 h-32 opacity-40 rotate-12 pointer-events-none"
        />
        <img
          src="/assets/playful/Star/Biru.png"
          alt=""
          className="absolute right-4 top-20 w-10 h-10 opacity-60 -rotate-6 pointer-events-none"
        />
        <img
          src="/assets/playful/Star/Merah.png"
          alt=""
          className="absolute -right-2 top-10 w-8 h-8 opacity-50 rotate-45 pointer-events-none"
        />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-20 h-20 gradient-yellow border-playful-thick rounded-2xl flex items-center justify-center shadow-playful">
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-2xl object-cover" />
            ) : (
              <UserIcon className="w-10 h-10 text-alfath-dark" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-extrabold text-foreground leading-tight">
              {user.nama}
            </h1>
            <p className="text-sm text-muted-foreground">{user.nim}</p>
            <Badge variant="playful-green" className="mt-2">
              {user.tingkatKader || "Kader Muda"}
            </Badge>
            <div className="mt-3">
              <Button
                onClick={() => navigate("/app/profile/id-card")}
                size="sm"
                variant="gradient-primary"
                className="rounded-xl h-8 text-xs gap-2 shadow-playful-sm"
              >
                <span className="text-sm">🆔</span>
                KTA DIGITAL
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card-pop p-4">
          <p className="text-[10px] text-muted-foreground font-medium mb-1">Divisi</p>
          <p className="font-bold text-foreground text-sm">{user.divisi || "-"}</p>
        </div>
        <div className="card-pop p-4">
          <p className="text-[10px] text-muted-foreground font-medium mb-1">Tingkat Kader</p>
          <p className="font-bold text-foreground text-sm">{user.tingkatKader || "Kader Muda"}</p>
        </div>
        <div className="card-pop p-4">
          <p className="text-[10px] text-muted-foreground font-medium mb-1">Generasi</p>
          <p className="font-bold text-foreground text-sm">{user.generasi || "-"}</p>
        </div>
        <div className="card-pop p-4">
          <p className="text-[10px] text-muted-foreground font-medium mb-1">Jabatan</p>
          <p className="font-bold text-foreground text-sm">{user.jabatan || "-"}</p>
        </div>
      </div>

      {/* Conditional Content: CTA for Guest vs Menu for User */}
      {user.divisi === "Tamu" ? (
        <Card className="p-6 border-playful-thick bg-[#FFFDF5] relative overflow-hidden mt-6">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <UserIcon className="w-32 h-32 text-primary" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-yellow-300 rounded-full opacity-20 blur-xl"></div>

          <div className="relative z-10 text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-2xl border-playful flex items-center justify-center mx-auto transform -rotate-3">
              <LogIn className="w-8 h-8 text-primary" />
            </div>

            <div>
              <h3 className="text-xl font-black text-foreground mb-2">
                Login Sekarang!!!
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">
                Anda Sepertinya belum login
              </p>
            </div>

            <Button
              onClick={handleLogin}
              variant="gradient-primary"
              size="lg"
              className="w-full text-lg h-12 shadow-playful hover:translate-y-[-2px] hover:shadow-playful-lg transition-all"
            >
              Masuk Sekarang
            </Button>

            <p className="text-xs text-muted-foreground mt-4">
              Syarat Keterntuan harusnya berlaku            </p>
          </div>
        </Card>
      ) : (
        <>
          {/* Menu List for Standard Users */}
          <div className="space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path} className="block">
                  <Card variant="playful" className="p-4 flex items-center gap-4 hover:translate-x-1 transition-transform">
                    <div className={`w-10 h-10 ${item.color} rounded-xl border-playful flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="flex-1 font-semibold text-foreground">{item.title}</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Logout Button */}
          <Button onClick={handleLogout} variant="gradient-red" className="w-full justify-start gap-4 mt-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-bold">Keluar</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default Profile;
