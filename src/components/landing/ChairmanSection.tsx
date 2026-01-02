import landingContent from "@/lib/data/landing-content.json";
import { Quote } from "lucide-react";

export const ChairmanSection = () => {
    const { chairman } = landingContent;

    return (
        <section className="py-20 container mx-auto px-4">
            <div className="card-pop bg-card overflow-hidden rounded-[2.5rem] relative">
                <div className="flex flex-col md:flex-row items-center">
                    {/* Photo */}
                    <div className="w-full md:w-1/3 bg-muted h-96 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                        {/* Placeholder if no real photo yet */}
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                            <span className="font-bold">Foto Ketua Umum</span>
                        </div>
                        {/* Real photo would be:
                  <img src={chairman.photo} alt={chairman.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 */}
                        <div className="absolute bottom-6 left-6 z-20 text-white">
                            <p className="font-bold text-xl">{chairman.name}</p>
                            <p className="opacity-90 text-sm">Ketua Umum {chairman.period}</p>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="w-full md:w-2/3 p-10 relative">
                        <Quote className="absolute top-10 left-10 w-16 h-16 text-primary/10 -rotate-12" />
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-6 text-foreground">Sambutan Ketua Umum</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed italic">
                                "{chairman.message}"
                            </p>
                        </div>
                        <Quote className="absolute bottom-10 right-10 w-16 h-16 text-primary/10 rotate-180" />
                    </div>
                </div>
            </div>
        </section>
    );
};
