import { useEffect, useState } from "react";
import { Bell, Sparkles, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getDailyWisdom, Wisdom } from "@/data/daily-wisdom";

interface DashboardHeaderProps {
    name: string;
    tingkatKader: string;
}

const DashboardHeader = ({ name, tingkatKader }: DashboardHeaderProps) => {
    const [wisdom, setWisdom] = useState<Wisdom | null>(null);

    useEffect(() => {
        setWisdom(getDailyWisdom());
    }, []);

    const getTimeGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Selamat Pagi";
        if (hour < 15) return "Selamat Siang";
        if (hour < 18) return "Selamat Sore";
        return "Selamat Malam";
    };

    const getTypeLabel = (type: Wisdom['type']) => {
        switch (type) {
            case 'quran': return 'Ayat Hari Ini';
            case 'hadits': return 'Hadist Hari Ini';
            case 'quote': return 'Mutiara Hikmah';
            default: return 'Mutiara Hikmah';
        }
    };

    return (
        <Card className="border-none shadow-lg relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 text-white min-h-[220px]">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                    <path d="M50 0 L50 100 M0 50 L100 50" stroke="currentColor" strokeWidth="0.5" />
                </svg>
            </div>

            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-800/20 rounded-full blur-xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <CardContent className="p-6 relative z-10 space-y-6">
                {/* Top Section: User Greeting */}
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-emerald-50 text-sm font-medium flex items-center gap-1 opacity-90">
                            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                            {getTimeGreeting()}
                        </p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1 leading-tight tracking-tight">
                            {name}
                        </h1>
                        <Badge className="mt-2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border-white/20 font-normal px-3">
                            {tingkatKader}
                        </Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="bg-white/10 text-white hover:bg-white/20 rounded-full h-10 w-10">
                        <Bell className="w-5 h-5" />
                    </Button>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                {/* Bottom Section: Daily Wisdom */}
                {wisdom && (
                    <div className="text-center space-y-3 pb-2">

                        {/* Type Badge */}
                        <div className="flex justify-center">
                            <Badge
                                variant="outline"
                                className="bg-emerald-900/20 border-white/20 text-emerald-50 text-[10px] tracking-wider uppercase px-2 py-0.5"
                            >
                                {getTypeLabel(wisdom.type)}
                            </Badge>
                        </div>

                        {/* Arabic Text */}
                        {wisdom.arabic && (
                            <div className="font-arabic text-xl sm:text-2xl leading-loose text-white drop-shadow-sm" dir="rtl">
                                {wisdom.arabic}
                            </div>
                        )}

                        {/* Translation */}
                        <figure className="max-w-xl mx-auto">
                            <blockquote className="text-base sm:text-lg font-medium leading-relaxed font-serif italic text-emerald-50/90">
                                "{wisdom.content}"
                            </blockquote>
                            <figcaption className="text-xs font-semibold text-emerald-100/70 mt-2 flex items-center justify-center gap-2">
                                <span className="w-4 h-[1px] bg-emerald-100/30"></span>
                                {wisdom.source}
                                <span className="w-4 h-[1px] bg-emerald-100/30"></span>
                            </figcaption>
                        </figure>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DashboardHeader;
