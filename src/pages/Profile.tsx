import MobileLayout from "@/components/layout/MobileLayout";
import { 
  User, Settings, LogOut, ChevronRight, 
  History, Award, Calendar, Briefcase 
} from "lucide-react";
import { Link } from "react-router-dom";

const mockProfile = {
  namaLengkap: "Ahmad Fauzan Hakim",
  nim: "22106050001",
  divisi: "Medkominfo",
  departemen: "Media & Komunikasi",
  tingkatKader: "Kader Madya",
  generasi: "Gen 12",
  jabatan: "Staf",
  avatar: null,
};

const menuItems = [
  {
    icon: History,
    title: "Riwayat Generasi",
    path: "/profile/riwayat-gen",
  },
  {
    icon: Briefcase,
    title: "Riwayat Kepanitiaan",
    path: "/profile/riwayat-panitia",
  },
  {
    icon: Calendar,
    title: "Riwayat Kegiatan",
    path: "/profile/riwayat-kegiatan",
  },
  {
    icon: Award,
    title: "Statistik Amalan",
    path: "/profile/statistik",
  },
  {
    icon: Settings,
    title: "Pengaturan",
    path: "/profile/settings",
  },
];

const Profile = () => {
  return (
    <MobileLayout>
      <div className="p-4 space-y-5">
        {/* Profile Card */}
        <div className="card-pop p-5 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 gradient-yellow rounded-full opacity-50" />
          <div className="absolute right-4 top-20 w-8 h-8 bg-alfath-blue rounded-full opacity-70" />
          
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-20 h-20 gradient-yellow border-playful-thick rounded-2xl flex items-center justify-center shadow-playful">
              {mockProfile.avatar ? (
                <img src={mockProfile.avatar} alt="Avatar" className="w-full h-full rounded-2xl object-cover" />
              ) : (
                <User className="w-10 h-10 text-alfath-dark" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-extrabold text-foreground leading-tight">
                {mockProfile.namaLengkap}
              </h1>
              <p className="text-sm text-muted-foreground">{mockProfile.nim}</p>
              <span className="inline-block mt-2 px-3 py-1 gradient-green border-playful text-[10px] font-bold rounded-full text-success-foreground">
                {mockProfile.tingkatKader}
              </span>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card-pop p-4">
            <p className="text-[10px] text-muted-foreground font-medium mb-1">Departemen</p>
            <p className="font-bold text-foreground text-sm">{mockProfile.departemen}</p>
          </div>
          <div className="card-pop p-4">
            <p className="text-[10px] text-muted-foreground font-medium mb-1">Divisi</p>
            <p className="font-bold text-foreground text-sm">{mockProfile.divisi}</p>
          </div>
          <div className="card-pop p-4">
            <p className="text-[10px] text-muted-foreground font-medium mb-1">Generasi</p>
            <p className="font-bold text-foreground text-sm">{mockProfile.generasi}</p>
          </div>
          <div className="card-pop p-4">
            <p className="text-[10px] text-muted-foreground font-medium mb-1">Jabatan</p>
            <p className="font-bold text-foreground text-sm">{mockProfile.jabatan}</p>
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
        <button className="w-full card-pop p-4 flex items-center gap-4 text-accent">
          <div className="w-10 h-10 gradient-red rounded-xl border-playful flex items-center justify-center">
            <LogOut className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="font-bold">Keluar</span>
        </button>
      </div>
    </MobileLayout>
  );
};

export default Profile;
