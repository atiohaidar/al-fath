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
      <Card variant="playful" className="p-4 flex flex-col items-center">
        <div className="w-12 h-12 gradient-green rounded-xl border-playful flex items-center justify-center mb-2">
          <CheckCircle2 className="w-6 h-6 text-success-foreground" />
        </div>
        <span className="text-lg font-extrabold text-foreground">{progress}%</span>
        <span className="text-[10px] text-muted-foreground font-medium">Amalan Hari Ini</span>
      </Card>

      {/* Upcoming Events */}
      <Card variant="playful" className="p-4 flex flex-col items-center">
        <div className="w-12 h-12 gradient-blue rounded-xl border-playful flex items-center justify-center mb-2">
          <Calendar className="w-6 h-6 text-secondary-foreground" />
        </div>
        <span className="text-lg font-extrabold text-foreground">{upcomingEvents}</span>
        <span className="text-[10px] text-muted-foreground font-medium">Event Mendatang</span>
      </Card>

      {/* Kader Rank */}
      <Card variant="playful" className="p-4 flex flex-col items-center">
        <div className="w-12 h-12 gradient-red rounded-xl border-playful flex items-center justify-center mb-2">
          <Star className="w-6 h-6 text-accent-foreground" />
        </div>
        <span className="text-lg font-extrabold text-foreground">#{kaderRank || "-"}</span>
        <span className="text-[10px] text-muted-foreground font-medium">Rank Bulan Ini</span>
      </Card>
    </div>
  );
};

export default QuickStats;
