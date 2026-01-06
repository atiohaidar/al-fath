import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
    return (
        <section id="home" className="pt-28 pb-20 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* F-Pattern: Text Left, Illustration Right */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content - Text */}
                    <div className="text-left">
                        {/* Main Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-6 animate-in fade-in slide-in-from-left-6 duration-700">
                            <span className="text-primary relative inline-block drop-shadow-[3px_3px_0px_rgba(0,0,0,0.15)]">
                                Rinai Hamaika
                                {/* Underline decoration */}
                                <svg className="absolute w-full h-3 -bottom-1 left-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="#FBBF24" strokeWidth="4" fill="none" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        {/* Tagline */}
                        <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 font-medium animate-in fade-in slide-in-from-left-6 duration-700 delay-100">
                            Rangkai Cerita, Inspirasi untuk Semua.                        </p>

                        {/* CTA Buttons - Pop Art Style */}
                        <div className="flex flex-col sm:flex-row items-start gap-4 animate-in fade-in slide-in-from-left-6 duration-700 delay-200">
                            <Button
                                asChild
                                size="lg"
                                className="bg-[#D93838] hover:bg-[#B82E2E] text-white font-bold px-8 py-6 text-lg border-3 border-black rounded-xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                            >
                                <Link to="/auth?mode=register">
                                    Gabung Sekarang
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                className="bg-white hover:bg-gray-50 text-foreground font-bold px-8 py-6 text-lg border-3 border-black rounded-xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                            >
                                <a href="#about">
                                    Pelajari Lebih Lanjut
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Right Content - Illustration/Visual */}
                    <div className="relative flex items-center justify-center animate-in fade-in slide-in-from-right-6 duration-700 delay-150">
                        {/* Main Visual Container - Playful Card Stack */}
                        <div className="relative w-full max-w-md">
                            {/* Background decorative cards */}
                            <div className="absolute -top-4 -left-4 w-full h-full bg-[#FBBF24] rounded-3xl border-4 border-black rotate-6"></div>
                            <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#3B82F6] rounded-3xl border-4 border-black -rotate-3"></div>

                            {/* Main Card with Logo */}
                            <div className="relative bg-[#FFFDF5] p-8 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                <div className="flex flex-col items-center">
                                    <img
                                        src="/logo.png"
                                        alt="LDK Al-Fath Logo"
                                        className="w-32 h-32 md:w-40 md:h-40 object-contain mb-4"
                                    />
                                    <h2 className="text-2xl md:text-3xl font-black text-center">LDK Al-Fath</h2>
                                    <p className="text-muted-foreground text-center font-medium mt-2">Universitas Telkom</p>
                                </div>

                                {/* Sticker decorations */}
                                <img
                                    src="/assets/playful/Star/Kuning.png"
                                    alt=""
                                    className="absolute -top-6 -right-6 w-14 h-14 rotate-12 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                                />
                                <img
                                    src="/assets/playful/Smiley/Asset 101@4x.png"
                                    alt=""
                                    className="absolute -bottom-5 -left-5 w-12 h-12 -rotate-12 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                                />
                                <img
                                    src="/assets/playful/Rectangle/Masya Allah.png"
                                    alt=""
                                    className="absolute -bottom-8 -right-4 w-24 rotate-6 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <img
                    src="/assets/playful/Star/Biru.png"
                    alt=""
                    className="absolute top-20 left-[5%] w-10 h-10 opacity-50 rotate-12 animate-pulse"
                />
                <img
                    src="/assets/playful/Star/Hijau.png"
                    alt=""
                    className="absolute top-1/2 right-[3%] w-8 h-8 opacity-40 -rotate-6 hidden lg:block"
                />
                <img
                    src="/assets/playful/Star/Ungu.png"
                    alt=""
                    className="absolute bottom-20 left-[8%] w-10 h-10 opacity-50 rotate-45"
                />
                <img
                    src="/assets/playful/Star/Merah.png"
                    alt=""
                    className="absolute bottom-32 right-[10%] w-8 h-8 opacity-40 -rotate-12 hidden lg:block"
                />
            </div>
        </section>
    );
};

export default HeroSection;
