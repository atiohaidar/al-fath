import timelineData from "@/lib/data/timeline.json";
import { CheckCircle2, Circle, Clock } from "lucide-react";

const TimelineSection = () => {
    return (
        <section id="timeline" className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-bold text-sm mb-4 border-2 border-accent/20">
                        Agenda Kami
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Timeline Kegiatan</h2>
                    <p className="text-muted-foreground">
                        Rangkaian kegiatan Al-Fath sepanjang periode kepengurusan.
                    </p>
                </div>

                <div className="relative max-w-3xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 md:translate-x-0 border-r-2 border-dashed border-muted-foreground/30" />

                    <div className="space-y-12">
                        {timelineData.map((item, index) => {
                            const isEven = index % 2 === 0;
                            const isCompleted = item.status === "completed";

                            return (
                                <div
                                    key={item.id}
                                    className={`relative flex flex-col md:flex-row gap-8 ${isEven ? "md:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Timeline Point */}
                                    <div className="absolute left-8 md:left-1/2 top-0 w-8 h-8 -translate-x-1/2 bg-background border-4 border-card rounded-full z-10 flex items-center justify-center">
                                        {isCompleted ? (
                                            <div className="w-full h-full bg-success rounded-full border-2 border-white" />
                                        ) : (
                                            <div className="w-3 h-3 bg-muted-foreground/30 rounded-full" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                                        <div className="group">
                                            <span className={`inline-flex items-center gap-2 text-sm font-bold mb-2 ${isCompleted ? 'text-success' : 'text-muted-foreground'}`}>
                                                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                                {item.date}
                                            </span>
                                            <div className="card-pop bg-card p-6 rounded-2xl group-hover:-translate-y-1 transition-transform">
                                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                                <p className="text-muted-foreground text-sm">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;
