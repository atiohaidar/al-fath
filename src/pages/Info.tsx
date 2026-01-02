import MobileLayout from "@/components/layout/MobileLayout";
import { ChevronRight, Target, Users, Building2, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    icon: Target,
    title: "Visi Misi Al Fath",
    description: "Visi, misi, dan tujuan organisasi",
    path: "/info/visi-misi",
    color: "gradient-yellow",
  },
  {
    icon: Building2,
    title: "Departemen & Divisi",
    description: "Struktur dan tugas masing-masing bagian",
    path: "/info/departemen",
    color: "gradient-blue",
  },
  {
    icon: Users,
    title: "Anggota",
    description: "Daftar anggota per departemen/divisi",
    path: "/info/anggota",
    color: "gradient-green",
  },
  {
    icon: BookOpen,
    title: "Tingkat Kader",
    description: "Jenjang dan syarat kenaikan tingkat",
    path: "/info/tingkat-kader",
    color: "gradient-red",
  },
];

const Info = () => {
  return (
    <MobileLayout>
      <div className="p-4 space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-xl font-extrabold text-foreground">Info Al Fath</h1>
          <p className="text-sm text-muted-foreground">Generasi 12 - 2025/2026</p>
        </div>

        {/* Banner */}
        <div className="gradient-yellow border-playful-thick shadow-playful-lg rounded-3xl p-5 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-alfath-red rounded-full opacity-70" />
          <div className="absolute right-10 top-10 w-10 h-10 bg-alfath-blue rounded-full" />
          <div className="absolute -right-2 bottom-6 w-14 h-14 bg-alfath-green rounded-lg rotate-12 opacity-80" />
          
          <div className="relative z-10">
            <p className="text-alfath-dark/70 text-sm font-medium">Slogan</p>
            <h2 className="text-2xl font-extrabold text-alfath-dark mt-1 leading-tight">
              "Dakwah in an Aesthetic Way"
            </h2>
            <p className="text-sm text-alfath-dark/80 mt-2">
              Berdakwah dengan cara yang indah dan menarik
            </p>
          </div>
        </div>

        {/* Menu List */}
        <div className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="card-pop p-4 flex items-center gap-4"
              >
                <div className={`w-12 h-12 ${item.color} rounded-xl border-playful flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card-pop p-4 text-center">
            <p className="text-2xl font-extrabold text-secondary">5</p>
            <p className="text-[10px] text-muted-foreground font-medium">Departemen</p>
          </div>
          <div className="card-pop p-4 text-center">
            <p className="text-2xl font-extrabold text-success">12</p>
            <p className="text-[10px] text-muted-foreground font-medium">Divisi</p>
          </div>
          <div className="card-pop p-4 text-center">
            <p className="text-2xl font-extrabold text-accent">156</p>
            <p className="text-[10px] text-muted-foreground font-medium">Anggota</p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Info;
