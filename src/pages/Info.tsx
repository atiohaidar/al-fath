import { ChevronRight, Target, Users, Building2, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import InfoCard from "@/components/ui/InfoCard";
import SectionLabel from "@/components/ui/SectionLabel";
import { Card } from "@/components/ui/card";
import { ROUTES } from "@/lib/routes";

const menuItems = [
  {
    icon: Target,
    title: "Visi Misi Al Fath",
    description: "Visi, misi, dan tujuan organisasi",
    path: "/info/visi-misi",
    color: "gradient-yellow", // TETAP SAMA
  },
  {
    icon: Building2,
    title: "Departemen & Divisi",
    description: "Struktur dan tugas masing-masing bagian",
    path: "/info/departemen",
    color: "gradient-blue", // TETAP SAMA
  },
  {
    icon: Users,
    title: "Anggota",
    description: "Daftar anggota per departemen/divisi",
    path: "/info/anggota",
    color: "gradient-green", // TETAP SAMA
  },
  {
    icon: BookOpen,
    title: "Tingkat Kader",
    description: "Jenjang dan syarat kenaikan tingkat",
    path: "/info/tingkat-kader",
    color: "gradient-red", // TETAP SAMA
  },
];

const Info = () => {
  return (
    <div className="p-4 space-y-6 relative">
      {/* Decorative stars */}
      <img
        src="/assets/playful/Star/Kuning.png"
        alt=""
        className="absolute top-2 right-4 w-12 h-12 opacity-80 rotate-12 pointer-events-none"
      />
      <img
        src="/assets/playful/Star/Biru.png"
        alt=""
        className="absolute top-40 -left-2 w-10 h-10 opacity-60 -rotate-6 pointer-events-none"
      />
      <img
        src="/assets/playful/Smiley/Asset 101@4x.png"
        alt=""
        className="absolute top-72 right-2 w-8 h-8 opacity-50 pointer-events-none"
      />

      {/* Header */}
      <div className="flex justify-center">
        <Card variant="playful" className="py-3 px-6 flex items-center gap-3 bg-card relative overflow-hidden w-fit">
          <div className="relative z-10 flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-xl font-extrabold text-foreground leading-none">Sekilas Al-Fath</h1>
              <p className="text-[10px] text-muted-foreground font-bold mt-1">Periode -----</p>
            </div>
          </div>
          {/* Decorative element typical of playful cards */}
          <div className="absolute right-0 top-0 w-16 h-16 bg-alfath-yellow/20 rounded-full blur-xl -mr-8 -mt-8" />
          <div className="absolute left-0 bottom-0 w-12 h-12 bg-alfath-blue/20 rounded-full blur-xl -ml-6 -mb-6" />
        </Card>
      </div>

      {/* Banner with InfoCard style */}
      <InfoCard label="Slogan ✨" labelVariant="accent">
        <div className="relative">
          {/* Decorative star assets */}
          <img
            src="/assets/playful/Star/Merah.png"
            alt=""
            className="absolute -right-2 -top-2 w-14 h-14 opacity-70 rotate-12 pointer-events-none"
          />
          <img
            src="/assets/playful/Star/Biru.png"
            alt=""
            className="absolute right-10 top-6 w-8 h-8 opacity-60 -rotate-6 pointer-events-none"
          />
          <img
            src="/assets/playful/Star/Hijau.png"
            alt=""
            className="absolute right-2 bottom-0 w-10 h-10 opacity-60 rotate-45 pointer-events-none"
          />

          <div className="relative z-10">
            <h2 className="text-xl font-extrabold text-foreground leading-tight">
              "Lebih Dekat, Lebih Bersahabat"
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Berdakwah dengan cara yang indah dan menarik
            </p>
          </div>
        </div>
      </InfoCard>

      {/* Menu Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <SectionLabel variant="secondary">Menu Utama</SectionLabel>
          <img
            src="/assets/playful/Star/Hijau.png"
            alt=""
            className="w-8 h-8 opacity-70"
          />
        </div>

        <div className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} className="block">
                <Card variant="playful" className="p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 ${item.color} rounded-xl border-playful flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="space-y-3">
        <SectionLabel variant="success">Statistik</SectionLabel>

        <div className="grid grid-cols-3 gap-3">
          <Card variant="playful" className="p-4 text-center">
            <p className="text-2xl font-extrabold text-secondary">5</p>
            <p className="text-[10px] text-muted-foreground font-medium">Departemen</p>
          </Card>
          <Card variant="playful" className="p-4 text-center">
            <p className="text-2xl font-extrabold text-success">12</p>
            <p className="text-[10px] text-muted-foreground font-medium">Divisi</p>
          </Card>
          <Card variant="playful" className="p-4 text-center">
            <p className="text-2xl font-extrabold text-accent">156</p>
            <p className="text-[10px] text-muted-foreground font-medium">Anggota</p>
          </Card>
        </div>
      </div>

      {/* Bottom decorative elements */}
      <img
        src="/assets/playful/Star/Merah.png"
        alt=""
        className="absolute bottom-28 right-2 w-10 h-10 opacity-50 -rotate-12 pointer-events-none"
      />
      <img
        src="/assets/playful/Star/Ungu.png"
        alt=""
        className="absolute bottom-48 -left-2 w-8 h-8 opacity-40 rotate-12 pointer-events-none"
      />
    </div>

  );
};

export default Info;
