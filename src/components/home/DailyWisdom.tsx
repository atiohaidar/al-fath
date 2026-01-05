import { useEffect, useState } from "react";
import { Sparkles, Quote } from "lucide-react";
import { getDailyWisdom, Wisdom } from "@/data/daily-wisdom";
import SectionLabel from "@/components/ui/SectionLabel";

const DailyWisdom = () => {
    const [wisdom, setWisdom] = useState<Wisdom | null>(null);

    useEffect(() => {
        setWisdom(getDailyWisdom());
    }, []);

    if (!wisdom) return null;

    const getTypeLabel = (type: Wisdom['type']) => {
        switch (type) {
            case 'quran': return 'Ayat Hari Ini';
            case 'hadits': return 'Hadist Hari Ini';
            case 'quote': return 'Mutiara Hikmah';
            default: return 'Mutiara Hikmah';
        }
    };

    const getLabelVariant = (type: Wisdom['type']): "primary" | "secondary" | "accent" | "success" => {
        switch (type) {
            case 'quran': return 'success'; // Green
            case 'hadits': return 'secondary'; // Blue
            case 'quote': return 'accent'; // Yellow/Orange
            default: return 'primary';
        }
    };

    return (
        <div className="w-full pt-2 px-1 mt-2">
            <div className="relative">
                {/* Floating Pill Label */}
                <div className="absolute -top-5 left-4 z-10 transform -rotate-1">
                    <SectionLabel variant={getLabelVariant(wisdom.type)}>
                        <span className="flex items-center gap-2">
                            {getTypeLabel(wisdom.type)}
                            <Sparkles className="w-3 h-3" />
                        </span>
                    </SectionLabel>
                </div>

                {/* Content Box */}
                <div className="bg-card border-[3px] border-alfath-dark rounded-2xl p-6 pt-8 shadow-playful relative overflow-hidden">

                    {/* Decorative Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="0.5" />
                            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" fill="none" />
                            <path d="M50 0 L50 100 M0 50 L100 50" stroke="currentColor" strokeWidth="0.5" />
                        </svg>
                    </div>

                    <div className="relative z-10 w-full text-center flex flex-col items-center justify-center gap-3">
                        {/* Arabic Text (If Available) */}
                        {wisdom.arabic && (
                            <div className="font-arabic text-xl sm:text-2xl mb-1 leading-loose text-foreground" dir="rtl">
                                {wisdom.arabic}
                            </div>
                        )}

                        {/* Translation/Content */}
                        <figure className="max-w-xl mx-auto">
                            <blockquote className="text-base sm:text-lg font-medium leading-relaxed mb-3 text-foreground/90">
                                "{wisdom.content}"
                            </blockquote>
                            <figcaption className="text-xs font-bold text-muted-foreground/80 flex items-center justify-center gap-2 uppercase tracking-wide">
                                <span className="w-4 h-[2px] bg-muted-foreground/30 rounded-full"></span>
                                {wisdom.source}
                                <span className="w-4 h-[2px] bg-muted-foreground/30 rounded-full"></span>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyWisdom;
