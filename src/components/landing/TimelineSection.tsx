import timelineData from "@/lib/data/timeline.json";
import { MapPin } from "lucide-react";

const TimelineSection = () => {
    // Pin positions for the zigzag pattern
    const pinPositions = [
        { x: 50, cardSide: 'right' },   // Item 1: Pin center, card right
        { x: 75, cardSide: 'left' },    // Item 2: Pin right, card left
        { x: 25, cardSide: 'right' },   // Item 3: Pin left, card right
        { x: 75, cardSide: 'left' },    // Item 4: Pin right, card left
        { x: 50, cardSide: 'left' },    // Item 5: Pin center, card left
    ];

    return (
        <section id="timeline" className="py-20 overflow-hidden relative bg-background">
            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 relative">
                    <div className="inline-block relative z-10">
                        <div className="bg-[#D93838] text-white px-8 py-3 rounded-full border-4 border-black transform -rotate-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider drop-shadow-md">
                                TIMELINE PROKER<br />BULANAN LDK
                            </h2>
                        </div>
                        <img
                            src="/assets/playful/Smiley/Asset 101@4x.png"
                            alt="Smiley"
                            className="absolute -top-8 -left-8 w-14 h-14 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] animate-bounce object-contain"
                        />
                        <img
                            src="/assets/playful/Star/Kuning.png"
                            alt="Star"
                            className="absolute -bottom-6 -right-6 w-12 h-12 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] animate-pulse object-contain"
                        />
                    </div>
                </div>

                {/* Timeline Container */}
                <div className="relative max-w-5xl mx-auto">

                    {/* ZIGZAG PATH SVG */}
                    <svg
                        className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        style={{ zIndex: 1 }}
                    >
                        <path
                            d="M 50 10 
                               C 65 15, 75 20, 75 30
                               C 75 40, 25 40, 25 50
                               C 25 60, 75 60, 75 70
                               C 75 80, 60 85, 50 90"
                            fill="none"
                            stroke="#444"
                            strokeWidth="0.6"
                            strokeDasharray="2 2"
                        />
                    </svg>

                    {/* Mobile: Simple Dashed Line */}
                    <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 border-l-4 border-dashed border-gray-400"></div>

                    {/* Timeline Items */}
                    <div className="relative" style={{ zIndex: 5 }}>
                        {timelineData.map((item, index) => {
                            const pinColors = ["text-[#3B82F6]", "text-[#F59E0B]", "text-[#10B981]", "text-[#8B5CF6]", "text-[#EC4899]"];
                            const pinColor = pinColors[index % pinColors.length];
                            const position = pinPositions[index] || { x: 50, cardSide: 'right' };

                            return (
                                <div
                                    key={item.id}
                                    className="mb-20 last:mb-0 relative"
                                    style={{ minHeight: '140px' }}
                                >
                                    {/* Mobile Layout */}
                                    <div className="md:hidden flex items-start gap-4 pl-4">
                                        <div className="relative z-10 flex-shrink-0">
                                            <MapPin className={`w-10 h-10 ${pinColor} fill-current stroke-white stroke-2 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]`} />
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-[#F59E0B] font-black text-base uppercase tracking-wide mb-2 block">
                                                {item.date}
                                            </span>
                                            <div className="bg-[#FFFDF5] p-4 border-3 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                                <h3 className="text-lg font-black mb-1">{item.title}</h3>
                                                <p className="text-gray-600 text-sm border-t-2 border-dashed border-gray-300 pt-2">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Desktop Layout */}
                                    <div className="hidden md:block relative h-full">
                                        {/* PIN with DATE above it */}
                                        <div
                                            className="absolute top-0 z-10 flex flex-col items-center"
                                            style={{ left: `${position.x}%`, transform: 'translateX(-50%)' }}
                                        >
                                            <span className="text-[#F59E0B] font-black text-lg uppercase tracking-wide mb-1 whitespace-nowrap">
                                                {item.date}
                                            </span>
                                            <MapPin className={`w-14 h-14 ${pinColor} fill-current stroke-white stroke-2 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.5)]`} />
                                        </div>

                                        {/* CARD - beside the pin */}
                                        <div
                                            className="absolute top-4 w-[320px]"
                                            style={{
                                                left: position.cardSide === 'right'
                                                    ? `calc(${position.x}% + 50px)`
                                                    : 'auto',
                                                right: position.cardSide === 'left'
                                                    ? `calc(${100 - position.x}% + 50px)`
                                                    : 'auto'
                                            }}
                                        >
                                            <div className="bg-[#FFFDF5] p-5 border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all relative">
                                                <h3 className="text-xl font-black mb-2">{item.title}</h3>
                                                <p className="text-gray-600 font-medium text-sm border-t-2 border-dashed border-gray-300 pt-2">{item.description}</p>

                                                {index === 1 && (
                                                    <img
                                                        src="/assets/playful/Rectangle/Letsgoo.png"
                                                        alt="Letsgoo"
                                                        className="absolute -bottom-6 -right-4 w-20 rotate-6 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                                    />
                                                )}
                                                {index === 3 && (
                                                    <img
                                                        src="/assets/playful/Star/Biru.png"
                                                        alt="Star"
                                                        className="absolute -bottom-5 -left-5 w-12 -rotate-12 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Floating Decorations */}
                    <div className="absolute top-[10%] left-0 hidden lg:block pointer-events-none" style={{ zIndex: 0 }}>
                        <img src="/assets/playful/Star/Merah.png" alt="Star" className="w-12 opacity-70 -rotate-12" />
                    </div>
                    <div className="absolute top-[40%] right-0 hidden lg:block pointer-events-none" style={{ zIndex: 0 }}>
                        <img src="/assets/playful/Star/Ungu.png" alt="Star" className="w-10 opacity-70 rotate-12" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;
