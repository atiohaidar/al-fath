import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
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
  },
  {
    icon: Briefcase,
    title: "Riwayat Kepanitiaan",
    path: ROUTES.APP.PROFILE_RIWAYAT_PANITIA,
    requiresAuth: true,
  },
  {
    icon: Calendar,
    title: "Riwayat Kegiatan",
    path: ROUTES.APP.PROFILE_RIWAYAT_KEGIATAN,
    requiresAuth: true,
  },
  {
    icon: Award,
    title: "Statistik Amalan",
    path: ROUTES.APP.PROFILE_STATISTIK,
    requiresAuth: false,
  },
  {
    icon: Settings,
    title: "Pengaturan",
    path: ROUTES.APP.PROFILE_SETTINGS,
    requiresAuth: false,
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
      <AppLayout>
        <div className="p-4 space-y-5">
          {/* Guest Profile Card */}
          <Card variant="playful" className="p-5 text-center">
            <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-3 flex items-center justify-center">
              <UserIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="font-bold text-foreground mb-1">Mode Tamu</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Login untuk mengakses fitur lengkap
            </p>
            <Button onClick={handleLogin} variant="gradient-primary" className="w-full">
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </Button>
          </Card>

          {/* Guest Menu - Limited Access */}
          <div className="space-y-2">
            {menuItems
              .filter((item) => !item.requiresAuth)
              .map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path}>
                    <Card variant="playful" className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-foreground" />
                      </div>
                      <span className="flex-1 font-semibold text-foreground">
                        {item.title}
                      </span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </Card>
                  </Link>
                );
              })}
          </div>
        </div>
      </AppLayout>
    );
  }

  // Logged-in User UI
  return (
    <AppLayout>
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

        {/* Menu List */}
        <div className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} className="block">
                <Card variant="playful" className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <span className="flex-1 font-semibold text-foreground">{item.title}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Logout Button */}
        <Button onClick={handleLogout} variant="gradient-red" className="w-full justify-start gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="font-bold">Keluar</span>
        </Button>
      </div>
    </AppLayout>
  );
};

export default Profile;
