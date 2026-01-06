import { useState, useEffect } from "react";
import { Check, ChevronLeft, ChevronRight, Plus, Pencil } from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { id } from "date-fns/locale";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRepositories } from "@/hooks/use-repositories";
import { Amalan } from "@/lib/data/interfaces";
import AddAmalanDialog from "@/components/amalan/AddAmalanDialog";
import EditAmalanDialog from "@/components/amalan/EditAmalanDialog";
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
  "Sholat Wajib": "gradient-green",
  "Sholat Sunnah": "gradient-blue",
  "Al-Quran": "gradient-yellow",
  "Dzikir": "gradient-red",
  "Amal": "bg-alfath-green",
  "Puasa": "bg-alfath-blue",
  "Lainnya": "bg-muted"
};

// Icon mapping per kategori - bisa di-customize
const categoryIcons: Record<string, string> = {
  "Sholat Wajib": "🕌",
  "Sholat Sunnah": "🏠",
  "Al-Quran": "📖",
  "Dzikir": "🤲",
  "Amal": "🤲",
  "Puasa": "🌙",
  "Lainnya": "🕌" // Default: masjid
};

const AmalanYaumiah = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAmalan, setSelectedAmalan] = useState<Amalan | null>(null);
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

  const handleEdit = (amalan: Amalan, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAmalan(amalan);
    setIsEditDialogOpen(true);
  };

  const handleLongPress = (amalan: Amalan) => {
    setSelectedAmalan(amalan);
    setIsEditDialogOpen(true);
  };

  const completedCount = amalanList ? amalanList.filter((a) => a.completed).length : 0;
  const progress = amalanList.length > 0 ? Math.round((completedCount / amalanList.length) * 100) : 0;

  // Celebration effect when 100% complete
  useEffect(() => {
    if (progress >= 100 && amalanList.length > 0) {
      // Simple confetti celebration
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const colors = ["#22c55e", "#fbbf24", "#3b82f6", "#ef4444"];

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const confetti = () => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) return;

        const particleCount = 3;
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          particle.style.position = "fixed";
          particle.style.width = "10px";
          particle.style.height = "10px";
          particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          particle.style.left = Math.random() * window.innerWidth + "px";
          particle.style.top = "-20px";
          particle.style.borderRadius = "50%";
          particle.style.pointerEvents = "none";
          particle.style.zIndex = "9999";
          particle.style.opacity = "1";
          document.body.appendChild(particle);

          const animation = particle.animate(
            [
              { transform: "translateY(0) rotate(0deg)", opacity: 1 },
              {
                transform: `translateY(${window.innerHeight}px) rotate(${randomInRange(0, 360)}deg)`,
                opacity: 0,
              },
            ],
            {
              duration: randomInRange(2000, 3000),
              easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }
          );

          animation.onfinish = () => particle.remove();
        }

        requestAnimationFrame(confetti);
      };

      confetti();
    }
  }, [progress, amalanList.length]);

  return (
    <div className="px-5 py-4 space-y-4">
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
      <Card variant="playful" className="p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-base font-bold text-foreground">Progress Hari Ini</span>
          <span className="text-base font-extrabold text-foreground">
            {completedCount}/{amalanList.length}
          </span>
        </div>
        <div className="h-2.5 bg-muted rounded-full overflow-hidden border-2 border-alfath-dark/20">
          <div
            className="h-full gradient-green transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center text-sm text-muted-foreground mt-3">
          {progress >= 100
            ? "🎉 Alhamdulillah, semua amalan selesai!"
            : progress >= 50
              ? "💪 Semangat, tinggal sedikit lagi!"
              : "☀️ Yuk mulai hari dengan amalan baik!"}
        </p>
      </Card>

      {/* Amalan List */}
      <div className="space-y-3 pb-2">
        {amalanList.map((amalan) => {
          let pressTimer: NodeJS.Timeout;

          const handleMouseDown = () => {
            pressTimer = setTimeout(() => handleLongPress(amalan), 500);
          };

          const handleMouseUp = () => {
            clearTimeout(pressTimer);
          };

          return (
            <div
              key={amalan.id}
              className="relative group"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchEnd={handleMouseUp}
            >
              <button
                onClick={() => amalan.id && toggleAmalan(amalan.id)}
                className={`w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${amalan.completed ? "opacity-60" : ""
                  }`}
              >
                <Card variant="playful" className="p-4 flex items-center gap-4 text-left hover:shadow-playful-lg transition-shadow">
                  <div
                    className={`w-12 h-12 rounded-xl border-playful flex items-center justify-center flex-shrink-0 transition-all ${amalan.completed
                        ? "gradient-green"
                        : categoryColors[amalan.category] || "bg-muted"
                      }`}
                  >
                    {amalan.completed ? (
                      <Check className="w-6 h-6 text-success-foreground" />
                    ) : (
                      <span className="text-lg">
                        {categoryIcons[amalan.category] || "🕌"}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base text-foreground">
                      {amalan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium mt-0.5">
                      {amalan.category}
                      {amalan.time && ` • ${amalan.time}`}
                    </p>
                  </div>

                  {/* Spacer for edit button */}
                  <div className="w-10"></div>
                </Card>
              </button>

              {/* Edit Button - appears on hover */}
              <button
                onClick={(e) => handleEdit(amalan, e)}
                className="absolute top-1/2 -translate-y-1/2 right-3 w-10 h-10 rounded-xl gradient-yellow border-playful shadow-playful-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-10"
                title="Edit amalan"
              >
                <Pencil className="w-5 h-5 text-alfath-dark" />
              </button>
            </div>
          );
        })}
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

      {/* Edit Amalan Dialog */}
      <EditAmalanDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedAmalan(null);
        }}
        amalan={selectedAmalan}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["amalans", formattedDate] });
          queryClient.invalidateQueries({ queryKey: ["weekly-stats"] });
        }}
      />
    </div>
  );
};

export default AmalanYaumiah;
