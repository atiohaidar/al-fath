import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Check, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { id } from "date-fns/locale";

interface Amalan {
  id: string;
  name: string;
  category: string;
  completed: boolean;
  time?: string;
}

const mockAmalanList: Amalan[] = [
  { id: "1", name: "Sholat Subuh", category: "Sholat Wajib", completed: true, time: "05:00" },
  { id: "2", name: "Sholat Dhuha", category: "Sholat Sunnah", completed: true },
  { id: "3", name: "Sholat Dzuhur", category: "Sholat Wajib", completed: true, time: "12:00" },
  { id: "4", name: "Sholat Ashar", category: "Sholat Wajib", completed: false, time: "15:00" },
  { id: "5", name: "Sholat Maghrib", category: "Sholat Wajib", completed: false, time: "18:00" },
  { id: "6", name: "Sholat Isya", category: "Sholat Wajib", completed: false, time: "19:00" },
  { id: "7", name: "Tilawah 1 Halaman", category: "Al-Quran", completed: true },
  { id: "8", name: "Dzikir Pagi", category: "Dzikir", completed: true },
  { id: "9", name: "Dzikir Petang", category: "Dzikir", completed: false },
  { id: "10", name: "Sholat Tahajud", category: "Sholat Sunnah", completed: false },
  { id: "11", name: "Sedekah", category: "Amal", completed: false },
  { id: "12", name: "Puasa Sunnah", category: "Puasa", completed: false },
];

const categoryColors: Record<string, string> = {
  "Sholat Wajib": "gradient-green",
  "Sholat Sunnah": "gradient-blue",
  "Al-Quran": "gradient-yellow",
  "Dzikir": "gradient-red",
  "Amal": "bg-alfath-green",
  "Puasa": "bg-alfath-blue",
};

const AmalanYaumiah = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amalanList, setAmalanList] = useState(mockAmalanList);

  const toggleAmalan = (id: string) => {
    setAmalanList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = amalanList.filter((a) => a.completed).length;
  const progress = Math.round((completedCount / amalanList.length) * 100);

  return (
    <MobileLayout>
      <div className="p-4 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-foreground">Amalan Yaumiah</h1>
          <button className="w-10 h-10 gradient-yellow border-playful rounded-xl flex items-center justify-center btn-pop">
            <Plus className="w-5 h-5 text-alfath-dark" />
          </button>
        </div>

        {/* Date Navigator */}
        <div className="flex items-center justify-between card-pop p-3">
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
        </div>

        {/* Progress */}
        <div className="card-pop p-4">
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
        </div>

        {/* Amalan List */}
        <div className="space-y-3">
          {amalanList.map((amalan) => (
            <button
              key={amalan.id}
              onClick={() => toggleAmalan(amalan.id)}
              className={`w-full card-pop p-4 flex items-center gap-4 text-left transition-all ${
                amalan.completed ? "opacity-70" : ""
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl border-playful flex items-center justify-center flex-shrink-0 ${
                  amalan.completed
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
                  className={`font-bold text-foreground ${
                    amalan.completed ? "line-through" : ""
                  }`}
                >
                  {amalan.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {amalan.category}
                  {amalan.time && ` • ${amalan.time}`}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default AmalanYaumiah;
