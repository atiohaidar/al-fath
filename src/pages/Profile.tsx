import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import {
  User as UserIcon, Settings, LogOut, ChevronRight,
  History, Award, Calendar, Briefcase
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRepositories } from "@/hooks/use-repositories";
import { User } from "@/lib/data/interfaces";
import { toast } from "sonner";



const menuItems = [
  {
    icon: History,
    title: "Riwayat Generasi",
    path: "/app/profile/riwayat-gen",
  },
  {
    icon: Briefcase,
    title: "Riwayat Kepanitiaan",
    path: "/app/profile/riwayat-panitia",
  },
  {
    icon: Calendar,
    title: "Riwayat Kegiatan",
    path: "/app/profile/riwayat-kegiatan",
  },
  {
    icon: Award,
    title: "Statistik Amalan",
    path: "/app/profile/statistik",
  },
  {
    icon: Settings,
    title: "Pengaturan",
    path: "/app/profile/settings",
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
        if (!currentUser) {
          navigate("/auth");
          return;
        }
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to load profile", error);
        toast.error("Gagal memuat profil");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [authRepository, navigate]);

  const handleLogout = async () => {
    await authRepository.logout();
    navigate("/auth");
    toast.info("Anda telah logout");
  };

  if (loading) return null; // Or a loading spinner
  if (!user) return null; // Should redirect in useEffect

  return (
    <AppLayout>
      <div className="p-4 space-y-5">
        {/* Profile Card */}
        <div className="card-pop p-5 relative overflow-hidden">
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
              <span className="inline-block mt-2 px-3 py-1 gradient-green border-playful text-[10px] font-bold rounded-full text-success-foreground">
                {user.tingkatKader || "Kader Muda"}
              </span>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card-pop p-4">
            <p className="text-[10px] text-muted-foreground font-medium mb-1">Departemen</p>
            <p className="font-bold text-foreground text-sm">{user.departemen || "-"}</p>
          </div>
          <div className="card-pop p-4">
            <p className="text-[10px] text-muted-foreground font-medium mb-1">Divisi</p>
            <p className="font-bold text-foreground text-sm">{user.divisi || "-"}</p>
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
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="card-pop p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <span className="flex-1 font-semibold text-foreground">{item.title}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </Link>
            );
          })}
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="w-full card-pop p-4 flex items-center gap-4 text-accent">
          <div className="w-10 h-10 gradient-red rounded-xl border-playful flex items-center justify-center">
            <LogOut className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="font-bold">Keluar</span>
        </button>
      </div>
    </AppLayout>
  );
};

export default Profile;
