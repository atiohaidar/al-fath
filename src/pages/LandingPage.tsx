import { useState } from "react";
import PublicNavbar from "@/components/landing/PublicNavbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import TimelineSection from "@/components/landing/TimelineSection";
import Footer from "@/components/landing/Footer";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ScrollToTop from "@/components/ui/ScrollToTop";
import LandingBreadcrumb from "@/components/landing/LandingBreadcrumb";
import ParallaxDecorativeElements from "@/components/ui/ParallaxDecorativeElements";

const LandingPage = () => {
    const [showLoading, setShowLoading] = useState(true);

    return (
        <>
            {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}

            <div className="min-h-screen bg-background font-sans selection:bg-primary/30">
                {/* Playful Background Decorations */}
                <ParallaxDecorativeElements variant="scattered" />
                <PublicNavbar />
                <LandingBreadcrumb />

                <main>
                    <HeroSection />
                    <AboutSection />
                    <TimelineSection />
                </main>

                <Footer />

                <ScrollToTop />
            </div>
        </>
    );
};

export default LandingPage;
