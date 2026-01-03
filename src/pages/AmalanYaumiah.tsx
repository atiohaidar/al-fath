import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { id } from "date-fns/locale";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRepositories } from "@/hooks/use-repositories";
import { Amalan } from "@/lib/data/interfaces";
import AddAmalanDialog from "@/components/amalan/AddAmalanDialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DEFAULT_AMALAN_TEMPLATE: Omit<Amalan, "id" | "date">[] = [
  { name: "Sholat Subuh", category: "Sholat Wajib", completed: false, time: "05:00" },
  { name: "Sholat Dhuha", category: "Sholat Sunnah", completed: false },
  { name: "Sholat Dzuhur", category: "Sholat Wajib", completed: false, time: "12:00" },
  { name: "Sholat Ashar", category: "Sholat Wajib", completed: false, time: "15:00" },
  { name: "Sholat Maghrib", category: "Sholat Wajib", completed: false, time: "18:00" },
  { name: "Sholat Isya", category: "Sholat Wajib", completed: false, time: "19:00" },
  { name: "Tilawah 1 Halaman", category: "Al-Quran", completed: false },
  { name: "Dzikir Pagi", category: "Dzikir", completed: false },
  { name: "Dzikir Petang", category: "Dzikir", completed: false },
  { name: "Sholat Tahajud", category: "Sholat Sunnah", completed: false },
  { name: "Sedekah", category: "Amal", completed: false },
  { name: "Puasa Sunnah", category: "Puasa", completed: false },
];

const categoryColors: Record<string, string> = {
  "Sholat Wajib": "gradient-green", // TETAP SAMA
  "Sholat Sunnah": "gradient-blue", // TETAP SAMA
  "Al-Quran": "gradient-yellow", // TETAP SAMA
  "Dzikir": "gradient-red", // TETAP SAMA
  "Amal": "bg-alfath-green",
  "Puasa": "bg-alfath-blue",
  "Lainnya": "bg-muted"
};

const AmalanYaumiah = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { amalanRepository } = useRepositories();
  const queryClient = useQueryClient();

  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const { data: amalanList = [] } = useQuery({
    queryKey: ["amalans", formattedDate],
    queryFn: async () => {
      return await amalanRepository.initDailyAmalans(formattedDate, DEFAULT_AMALAN_TEMPLATE);
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async (id: number) => {
      await amalanRepository.toggleAmalan(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amalans", formattedDate] });
      queryClient.invalidateQueries({ queryKey: ["weekly-stats"] });
    },
  });

  const toggleAmalan = (id: number) => {
    toggleMutation.mutate(id);
  };

  const completedCount = amalanList ? amalanList.filter((a) => a.completed).length : 0;
  const progress = amalanList.length > 0 ? Math.round((completedCount / amalanList.length) * 100) : 0;

  return (
    <div className="p-4 space-y-5">
      {/* Header */}
      {/* Header */}
      <div className="flex justify-center">
        <Card variant="playful" className="py-2 px-6 flex items-center justify-between gap-4 bg-card relative overflow-hidden w-fit">
          <div className="relative z-10 flex items-center gap-4">
            <h1 className="text-xl font-extrabold text-foreground">Amalan Yaumiah</h1>
            <Button
              onClick={() => setIsDialogOpen(true)}
              variant="gradient-yellow"
              size="icon-playful"
              className="h-9 w-9"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          {/* Decorative element typical of playful cards */}
          <div className="absolute right-0 top-0 w-16 h-16 bg-alfath-yellow/20 rounded-full blur-xl -mr-8 -mt-8" />
          <div className="absolute left-0 bottom-0 w-12 h-12 bg-alfath-blue/20 rounded-full blur-xl -ml-6 -mb-6" />
        </Card>
      </div>

      {/* Date Navigator */}
      <Card variant="playful" className="p-3 flex items-center justify-between">
        <button
          onClick={() => setSelectedDate(subDays(selectedDate, 1))}
          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <p className="text-lg font-bold text-foreground">
            {format(selectedDate, "EEEE", { locale: id })}
          </p>
          <p className="text-xs text-muted-foreground">
            {format(selectedDate, "d MMMM yyyy", { locale: id })}
          </p>
        </div>
        <button
          onClick={() => setSelectedDate(addDays(selectedDate, 1))}
          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </Card>

      {/* Progress */}
      <Card variant="playful" className="p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-foreground">Progress Hari Ini</span>
          <span className="text-sm font-bold text-foreground">
            {completedCount}/{amalanList.length}
          </span>
        </div>
        <div className="h-4 bg-muted rounded-full overflow-hidden border-playful">
          <div
            className="h-full gradient-green transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">
          {progress >= 100
            ? "🎉 Alhamdulillah, semua amalan selesai!"
            : progress >= 50
              ? "💪 Semangat, tinggal sedikit lagi!"
              : "☀️ Yuk mulai hari dengan amalan baik!"}
        </p>
      </Card>

      {/* Amalan List */}
      <div className="space-y-3">
        {amalanList.map((amalan) => (
          <button
            key={amalan.id}
            onClick={() => amalan.id && toggleAmalan(amalan.id)}
            className={`w-full transition-all ${amalan.completed ? "opacity-70" : ""
              }`}
          >
            <Card variant="playful" className="p-4 flex items-center gap-4 text-left">
              <div
                className={`w-12 h-12 rounded-xl border-playful flex items-center justify-center flex-shrink-0 ${amalan.completed
                  ? "gradient-green"
                  : categoryColors[amalan.category] || "bg-muted"
                  }`}
              >
                {amalan.completed ? (
                  <Check className="w-6 h-6 text-success-foreground" />
                ) : (
                  <span className="text-lg">📿</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-bold text-foreground ${amalan.completed ? "line-through" : ""
                    }`}
                >
                  {amalan.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {amalan.category}
                  {amalan.time && ` • ${amalan.time}`}
                </p>
              </div>
            </Card>
          </button>
        ))}
      </div>

      {/* Add Amalan Dialog */}
      <AddAmalanDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        date={formattedDate}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["amalans", formattedDate] });
        }}
      />
    </div>
  );
};

export default AmalanYaumiah;
