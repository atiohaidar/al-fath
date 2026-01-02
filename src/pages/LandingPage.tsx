import PublicNavbar from "@/components/landing/PublicNavbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import { ChairmanSection } from "@/components/landing/ChairmanSection";
import TimelineSection from "@/components/landing/TimelineSection";
import { StructureSection } from "@/components/landing/StructureSection";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-background font-sans selection:bg-primary/30">
            <PublicNavbar />

            <main>
                <HeroSection />
                <AboutSection />
                <ChairmanSection />
                <StructureSection />
                <TimelineSection />
            </main>

            {/* Footer */}
            <footer className="bg-muted py-12 border-t-2 border-dashed border-border">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-card border-playful flex items-center justify-center p-1">
                            <img src="/logo.png" alt="AF" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-xl">LDK Al-Fath</span>
                    </div>
                    <p className="text-muted-foreground mb-8 text-sm">
                        Lebih Dekat, Lebih Bersahabat. <br />
                        Sekretariat LDK Al-Fath, Universitas Telkom.
                    </p>
                    <p className="text-xs text-muted-foreground/50">
                        © 2026 Al-Fath Dev Team. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
