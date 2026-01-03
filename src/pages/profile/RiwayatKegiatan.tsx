import { useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RiwayatKegiatan = () => {
    const navigate = useNavigate();

    return (
        <div className="p-4 space-y-5">
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-xl font-extrabold text-foreground">Riwayat Kegiatan</h1>
            </div>

            <Card variant="playful" className="p-10 text-center opacity-50">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p>Belum ada riwayat data kegiatan.</p>
            </Card>
        </div>
    );
};

export default RiwayatKegiatan;
