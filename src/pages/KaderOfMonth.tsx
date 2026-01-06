import { useState, useEffect } from "react";
import { Trophy, Medal, Star, TrendingUp, ChevronLeft } from "lucide-react";
import { useRepositories } from "@/hooks/use-repositories";
import { KaderRank, User } from "@/lib/data/interfaces";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
  const navigate = useNavigate();
  const { authRepository } = useRepositories();
  const [rankings, setRankings] = useState<KaderRank[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const currentMonth = new Date().toLocaleDateString("id-ID", { month: "long", year: "numeric" });

  useEffect(() => {
    const loadData = async () => {
      const [rankData, user] = await Promise.all([
        authRepository.getKaderRankings(),
        authRepository.getCurrentUser()
      ]);
      setRankings(rankData);
      setCurrentUser(user);
      setLoading(false);
    };
    loadData();
  }, [authRepository]);

  if (loading || rankings.length < 3) return null;

  const userRankIndex = currentUser ? rankings.findIndex(r => r.name === currentUser.nama) : -1;
  const userScore = userRankIndex !== -1 ? rankings[userRankIndex].score : 0;

  return (
    <div className="p-4 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="border-playful-sm">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div className="flex-1 text-center pr-10">
          <h1 className="text-xl font-extrabold text-foreground">Kader of The Month</h1>
          <p className="text-sm text-muted-foreground">{currentMonth}</p>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-3 py-4">
        {/* 2nd Place */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 border-playful rounded-2xl flex items-center justify-center mb-2">
            <span className="text-2xl">👤</span>
          </div>
          <div className="w-20 h-20 bg-slate-300 border-playful rounded-t-xl flex flex-col items-center justify-center">
            <Medal className="w-6 h-6 text-slate-600 mb-1" />
            <span className="text-xs font-bold text-slate-700">2nd</span>
          </div>
          <p className="text-xs font-bold text-foreground mt-2 text-center max-w-16 truncate">
            {rankings[1].name.split(" ")[0]}
          </p>
          <p className="text-[10px] text-muted-foreground">{rankings[1].score} pts</p>
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
            {rankings[0].name.split(" ")[0]}
          </p>
          <p className="text-xs text-muted-foreground">{rankings[0].score} pts</p>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-orange-200 border-playful rounded-2xl flex items-center justify-center mb-2">
            <span className="text-2xl">👤</span>
          </div>
          <div className="w-20 h-16 bg-orange-300 border-playful rounded-t-xl flex flex-col items-center justify-center">
            <Medal className="w-6 h-6 text-orange-700 mb-1" />
            <span className="text-xs font-bold text-orange-800">3rd</span>
          </div>
          <p className="text-xs font-bold text-foreground mt-2 text-center max-w-16 truncate">
            {rankings[2].name.split(" ")[0]}
          </p>
          <p className="text-xs text-muted-foreground">{rankings[2].score} pts</p>
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
            <p className="text-xl font-extrabold text-success-foreground">
              {userRankIndex !== -1 ? `#${userRankIndex + 1}` : "Bukan Top 10"} dari 156 kader
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extrabold text-success-foreground">{userScore}</p>
            <p className="text-xs text-success-foreground/80">poin</p>
          </div>
        </div>
      </div>

      {/* Full Rankings */}
      <div className="space-y-2 pb-10">
        <h2 className="text-lg font-bold text-foreground pl-1">Peringkat Lengkap</h2>
        {rankings.slice(3).map((kader) => (
          <div key={kader.rank} className="card-pop p-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center border-playful-sm flex-shrink-0">
              {getRankIcon(kader.rank)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-foreground truncate">{kader.name}</p>
              <p className="text-xs text-muted-foreground">{kader.divisi}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-extrabold text-foreground">{kader.score}</p>
              <p className="text-[10px] text-muted-foreground">poin</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KaderOfMonth;
