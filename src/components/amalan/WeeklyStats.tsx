import { useQuery } from "@tanstack/react-query";
import { useRepositories } from "@/hooks/use-repositories";
import { format, subDays } from "date-fns";
import { id } from "date-fns/locale";
import { TrendingUp, Flame } from "lucide-react";

const WeeklyStats = () => {
    const { amalanRepository } = useRepositories();
    const today = new Date();

    // Get last 7 days data
    const { data: weeklyData = [] } = useQuery({
        queryKey: ["weekly-stats"],
        queryFn: async () => {
            const promises = Array.from({ length: 7 }, (_, i) => {
                const date = format(subDays(today, 6 - i), "yyyy-MM-dd");
                return amalanRepository.getAmalans(date).then((amalans) => ({
                    date,
                    total: amalans.length,
                    completed: amalans.filter((a) => a.completed).length,
                    percentage: amalans.length > 0 ? Math.round((amalans.filter((a) => a.completed).length / amalans.length) * 100) : 0,
                }));
            });
            return Promise.all(promises);
        },
    });

    // Calculate streak (consecutive 100% days)
    const streak = weeklyData.reduce((count, day) => {
        if (day.percentage === 100) return count + 1;
        return 0;
    }, 0);

    const avgCompletion = weeklyData.length > 0
        ? Math.round(weeklyData.reduce((sum, day) => sum + day.percentage, 0) / weeklyData.length)
        : 0;

    return (
        <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-3">
                <div className="card-pop p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-alfath-blue" />
                        <p className="text-[10px] text-muted-foreground font-medium">Rata-rata</p>
                    </div>
                    <p className="text-2xl font-extrabold text-foreground">{avgCompletion}%</p>
                </div>
                <div className="card-pop p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Flame className="w-4 h-4 text-alfath-red" />
                        <p className="text-[10px] text-muted-foreground font-medium">Streak</p>
                    </div>
                    <p className="text-2xl font-extrabold text-foreground">{streak} hari</p>
                </div>
            </div>

            {/* Weekly Chart */}
            <div className="card-pop p-4">
                <h3 className="text-sm font-bold text-foreground mb-3">7 Hari Terakhir</h3>
                <div className="flex items-end justify-between gap-2 h-32">
                    {weeklyData.map((day, index) => (
                        <div key={day.date} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full flex flex-col justify-end h-full">
                                <div
                                    className={`w-full rounded-t-lg transition-all ${day.percentage === 100
                                            ? "gradient-green"
                                            : day.percentage >= 50
                                                ? "gradient-yellow"
                                                : "gradient-red"
                                        }`}
                                    style={{ height: `${day.percentage}%` }}
                                />
                            </div>
                            <p className="text-[10px] font-semibold text-muted-foreground">
                                {format(new Date(day.date), "EEE", { locale: id }).substring(0, 3)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Motivational Message */}
            <div className="card-pop p-4 bg-gradient-to-br from-alfath-yellow/10 to-alfath-blue/10">
                <p className="text-sm text-center font-semibold text-foreground">
                    {streak >= 7
                        ? "🔥 Luar biasa! Streak 7 hari berturut-turut!"
                        : streak >= 3
                            ? "💪 Pertahankan! Streak " + streak + " hari!"
                            : avgCompletion >= 80
                                ? "⭐ Konsistensi yang bagus minggu ini!"
                                : avgCompletion >= 50
                                    ? "📈 Terus tingkatkan, kamu bisa lebih baik!"
                                    : "🌱 Mulai dari yang kecil, konsisten adalah kunci!"}
                </p>
            </div>
        </div>
    );
};

export default WeeklyStats;
