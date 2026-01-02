import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
    id: string;
    label: string;
    href: string;
}

const breadcrumbItems: BreadcrumbItem[] = [
    { id: "home", label: "Beranda", href: "#home" },
    { id: "about", label: "Profil", href: "#about" },
    { id: "chairman", label: "Ketua", href: "#chairman" },
    { id: "structure", label: "Struktur", href: "#structure" },
    { id: "timeline", label: "Timeline", href: "#timeline" },
];

const LandingBreadcrumb = () => {
    const [activeSection, setActiveSection] = useState("home");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show breadcrumb after scrolling past hero
            setIsVisible(window.scrollY > 200);

            // Detect active section
            const sections = breadcrumbItems.map((item) => item.id);
            let currentSection = "home";

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Section is considered active if it's in the top half of viewport
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
                        currentSection = sectionId;
                    }
                }
            }

            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleClick = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div
            className={cn(
                "fixed top-20 left-0 right-0 z-40 transition-all duration-300",
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4 pointer-events-none"
            )}
        >
            <div className="container mx-auto px-4">
                <div className="inline-flex items-center gap-2 bg-card/95 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-border shadow-playful-sm overflow-x-auto max-w-full">
                    {breadcrumbItems.map((item, index) => {
                        const isActive = activeSection === item.id;
                        const isLast = index === breadcrumbItems.length - 1;

                        return (
                            <div key={item.id} className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={() => handleClick(item.href)}
                                    className={cn(
                                        "text-sm font-semibold transition-colors whitespace-nowrap",
                                        isActive
                                            ? "text-primary"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {item.label}
                                </button>
                                {!isLast && (
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LandingBreadcrumb;
