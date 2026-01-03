import WeeklyStats from "@/components/amalan/WeeklyStats";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/lib/routes";
import { Card } from "@/components/ui/card";

const StatistikAmalan = () => {
    const navigate = useNavigate();

    return (
        <div className="p-4 space-y-5">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate(ROUTES.APP.PROFILE)}
                    className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-extrabold text-foreground">Statistik Amalan</h1>
            </div>

            {/* Weekly Statistics */}
            <WeeklyStats />

            {/* Info */}
            <Card variant="playful" className="p-4">
                <p className="text-sm text-muted-foreground text-center">
                    💡 Statistik ini menampilkan progress amalan 7 hari terakhir. Pertahankan konsistensi untuk meningkatkan streak!
                </p>
            </Card>
        </div>
    );
};

export default StatistikAmalan;
