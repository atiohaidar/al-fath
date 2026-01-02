import MobileLayout from "@/components/layout/MobileLayout";
import { Trophy, Medal, Star, TrendingUp } from "lucide-react";

interface KaderRank {
  rank: number;
  name: string;
  divisi: string;
  score: number;
  avatar?: string;
}

const mockRankings: KaderRank[] = [
  { rank: 1, name: "Fatimah Azzahra", divisi: "PSDM", score: 98 },
  { rank: 2, name: "Muhammad Rizki", divisi: "Kaderisasi", score: 95 },
  { rank: 3, name: "Aisyah Putri", divisi: "Medkominfo", score: 92 },
  { rank: 4, name: "Ahmad Fauzan", divisi: "Medkominfo", score: 88 },
  { rank: 5, name: "Umar Abdullah", divisi: "Syiar", score: 85 },
  { rank: 6, name: "Khadijah Sari", divisi: "Sosmas", score: 82 },
  { rank: 7, name: "Bilal Ibrahim", divisi: "PSDM", score: 80 },
  { rank: 8, name: "Maryam Husna", divisi: "Kaderisasi", score: 78 },
  { rank: 9, name: "Yusuf Hakim", divisi: "Syiar", score: 75 },
  { rank: 10, name: "Sarah Amelia", divisi: "Sosmas", score: 72 },
];

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return "gradient-yellow border-playful-thick";
    case 2:
      return "bg-gray-200 border-playful";
    case 3:
      return "bg-orange-200 border-playful";
    default:
      return "bg-muted";
  }
};

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="w-6 h-6 text-alfath-dark" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-600" />;
    case 3:
      return <Medal className="w-6 h-6 text-orange-600" />;
    default:
      return <span className="font-extrabold text-lg text-muted-foreground">#{rank}</span>;
  }
};

const KaderOfMonth = () => {
  const currentMonth = new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" });

  return (
    <MobileLayout>
      <div className="p-4 space-y-5">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-extrabold text-foreground">Kader of The Month</h1>
          <p className="text-sm text-muted-foreground">{currentMonth}</p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex items-end justify-center gap-3 py-4">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-200 border-playful rounded-2xl flex items-center justify-center mb-2">
              <span className="text-2xl">👤</span>
            </div>
            <div className="w-20 h-20 gradient-blue border-playful rounded-t-xl flex flex-col items-center justify-center">
              <Medal className="w-6 h-6 text-gray-600 mb-1" />
              <span className="text-xs font-bold text-secondary-foreground">2nd</span>
            </div>
            <p className="text-xs font-bold text-foreground mt-2 text-center max-w-16 truncate">
              {mockRankings[1].name.split(" ")[0]}
            </p>
            <p className="text-[10px] text-muted-foreground">{mockRankings[1].score} pts</p>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center -mt-4">
            <Star className="w-8 h-8 text-primary animate-bounce-soft mb-1" />
            <div className="w-20 h-20 gradient-yellow border-playful-thick rounded-2xl flex items-center justify-center mb-2 shadow-playful">
              <span className="text-3xl">👤</span>
            </div>
            <div className="w-24 h-24 gradient-yellow border-playful-thick rounded-t-xl flex flex-col items-center justify-center shadow-playful">
              <Trophy className="w-8 h-8 text-alfath-dark mb-1" />
              <span className="text-sm font-extrabold text-alfath-dark">1st</span>
            </div>
            <p className="text-sm font-extrabold text-foreground mt-2 text-center">
              {mockRankings[0].name.split(" ")[0]}
            </p>
            <p className="text-xs text-muted-foreground">{mockRankings[0].score} pts</p>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-200 border-playful rounded-2xl flex items-center justify-center mb-2">
              <span className="text-2xl">👤</span>
            </div>
            <div className="w-20 h-16 gradient-red border-playful rounded-t-xl flex flex-col items-center justify-center">
              <Medal className="w-6 h-6 text-orange-600 mb-1" />
              <span className="text-xs font-bold text-accent-foreground">3rd</span>
            </div>
            <p className="text-xs font-bold text-foreground mt-2 text-center max-w-16 truncate">
              {mockRankings[2].name.split(" ")[0]}
            </p>
            <p className="text-[10px] text-muted-foreground">{mockRankings[2].score} pts</p>
          </div>
        </div>

        {/* Your Position */}
        <div className="card-pop p-4 gradient-green">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-card border-playful rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-success-foreground/80">Posisi Kamu</p>
              <p className="text-xl font-extrabold text-success-foreground">#4 dari 156 kader</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold text-success-foreground">88</p>
              <p className="text-xs text-success-foreground/80">poin</p>
            </div>
          </div>
        </div>

        {/* Full Rankings */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-foreground">Peringkat Lengkap</h2>
          {mockRankings.slice(3).map((kader) => (
            <div key={kader.rank} className="card-pop p-3 flex items-center gap-3">
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                {getRankIcon(kader.rank)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground truncate">{kader.name}</p>
                <p className="text-xs text-muted-foreground">{kader.divisi}</p>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-foreground">{kader.score}</p>
                <p className="text-[10px] text-muted-foreground">poin</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default KaderOfMonth;
