import { CheckCircle2, Calendar, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

interface QuickStatsProps {
  amalanCompleted: number;
  amalanTotal: number;
  upcomingEvents: number;
  kaderRank?: number;
}

const QuickStats = ({ amalanCompleted, amalanTotal, upcomingEvents, kaderRank }: QuickStatsProps) => {
  const progress = Math.round((amalanCompleted / amalanTotal) * 100);

  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Amalan Progress */}
      <Card variant="playful" className="p-5 flex flex-col items-center transition-all duration-200 hover:shadow-soft-lg hover:-translate-y-0.5">
        <div className="w-14 h-14 gradient-green rounded-xl border-playful flex items-center justify-center mb-3">
          <CheckCircle2 className="w-7 h-7 text-white" />
        </div>
        <span className="text-2xl font-extrabold text-foreground">{progress}%</span>
        <span className="text-xs text-muted-foreground font-semibold mt-1">Amalan Hari Ini</span>
      </Card>

      {/* Upcoming Events */}
      <Card variant="playful" className="p-5 flex flex-col items-center transition-all duration-200 hover:shadow-soft-lg hover:-translate-y-0.5">
        <div className="w-14 h-14 gradient-blue rounded-xl border-playful flex items-center justify-center mb-3">
          <Calendar className="w-7 h-7 text-white" />
        </div>
        <span className="text-2xl font-extrabold text-foreground">{upcomingEvents}</span>
        <span className="text-xs text-muted-foreground font-semibold mt-1">Event Mendatang</span>
      </Card>

      {/* Kader Rank */}
      <Card variant="playful" className="p-5 flex flex-col items-center transition-all duration-200 hover:shadow-soft-lg hover:-translate-y-0.5">
        <div className="w-14 h-14 gradient-red rounded-xl border-playful flex items-center justify-center mb-3">
          <Star className="w-7 h-7 text-white" />
        </div>
        <span className="text-2xl font-extrabold text-foreground">#{kaderRank || "-"}</span>
        <span className="text-xs text-muted-foreground font-semibold mt-1">Rank Bulan Ini</span>
      </Card>
    </div>
  );
};

export default QuickStats;
