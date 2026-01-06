import { ClipboardCheck, CalendarCheck, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import SectionLabel from "@/components/ui/SectionLabel";
import { Card } from "@/components/ui/card";

import { ROUTES } from "@/lib/routes";

const actions = [
  {
    icon: ClipboardCheck,
    label: "Isi Amalan",
    description: "Catat amalan harian",
    path: ROUTES.APP.AMALAN,
    color: "gradient-yellow",
  },
  {
    icon: CalendarCheck,
    label: "Presensi",
    description: "Absen kegiatan",
    path: ROUTES.APP.EVENTS,
    color: "gradient-blue",
  },
  {
    icon: Users,
    label: "Anggota",
    description: "Lihat struktur",
    path: ROUTES.APP.INFO,
    color: "gradient-green",
  },
  {
    icon: Trophy,
    label: "Kader of Month",
    description: "Lihat peringkat",
    path: ROUTES.APP.KADER_OF_MONTH,
    color: "gradient-red",
  },
];

const QuickActions = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <SectionLabel variant="primary">Menu Cepat</SectionLabel>
        <img
          src="/assets/playful/Star/Kuning.png"
          alt=""
          className="w-6 h-6 opacity-80"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.path}
              to={action.path}
              className="group"
            >
              <Card variant="playful" className="p-5 flex items-center gap-3 cursor-pointer transition-all duration-200 hover:shadow-soft-lg hover:-translate-y-1 hover:scale-[1.02] active:translate-y-0 active:scale-100">
                <div className={`w-14 h-14 ${action.color} rounded-xl border-playful flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-sm text-foreground truncate">{action.label}</h3>
                  <p className="text-xs text-muted-foreground truncate">{action.description}</p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
