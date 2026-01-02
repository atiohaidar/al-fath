import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section id="home" className="pt-32 pb-20 relativoverflow-hidden">
            <div className="container mx-auto px-4 text-center relative z-10">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-8 border-2 border-secondary/20 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Sparkles className="w-4 h-4" />
                    <span>Lebih Dekat, Lebih Bersahabat</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                    Mewujudkan <br />
                    <span className="text-primary relative inline-block">
                        Generasi Rabbani
                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                        </svg>
                    </span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                    Bergabung bersama keluarga besar LDK Al-Fath Universitas Telkom.
                    Wadah berkarya, berdakwah, dan bersilaturahmi.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
                    <Link
                        to="/auth?mode=register"
                        className="px-8 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-2xl shadow-playful hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-playful-sm transition-all border-2 border-alfath-dark flex items-center gap-2"
                    >
                        Gabung Sekarang
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <a
                        href="#about"
                        className="px-8 py-4 bg-card text-foreground font-bold text-lg rounded-2xl border-2 border-border hover:border-playful hover:bg-muted/50 transition-all"
                    >
                        Pelajari Lebih Lanjut
                    </a>
                </div>
            </div>

            {/* Floating Elements Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse delay-700" />
            </div>
        </section>
    );
};

export default HeroSection;
