import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

const PublicNavbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Beranda", href: "#home" },
        { label: "Profil", href: "#about" },
        { label: "Kegiatan", href: "#timeline" },
        { label: "Struktur", href: "#structure" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
                    <span className="text-xl font-bold tracking-tight text-foreground">Al-Fath</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <Link
                        to="/auth"
                        className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl shadow-playful hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-playful-sm transition-all border-2 border-alfath-dark flex items-center gap-2"
                    >
                        Masuk
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-foreground"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-background border-b shadow-lg p-4 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-base font-semibold text-muted-foreground hover:text-foreground py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link
                        to="/auth"
                        className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl text-center border-2 border-alfath-dark shadow-playful active:shadow-playful-sm active:translate-y-0.5 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Masuk Member
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default PublicNavbar;
