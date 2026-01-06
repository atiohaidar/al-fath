import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import DecorativeElements from "@/components/ui/DecorativeElements";
import { navItems } from "@/config/nav-items";

interface DesktopLayoutProps {
    children: ReactNode;
    showDecorations?: boolean;
}

const DesktopLayout = ({ children, showDecorations = true }: DesktopLayoutProps) => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-background relative flex">
            {/* Paper texture background */}
            <div
                className="fixed inset-0 z-0 opacity-30 pointer-events-none"
                style={{
                    backgroundImage: `url('/assets/playful/Texture/grid full.png')`,
                    backgroundSize: '400px 400px',
                    backgroundRepeat: 'repeat',
                }}
            />

            {/* Decorative elements */}
            {showDecorations && <DecorativeElements variant="scattered" />}

            {/* Sidebar */}
            <aside className="w-64 h-screen sticky top-0 border-r-2 border-alfath-dark bg-card/50 backdrop-blur-md z-20 flex flex-col p-6 shadow-playful">

                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-card border-playful flex items-center justify-center p-1">
                        <img src="/logo.png" alt="AF" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-black text-xl leading-none text-[#9F1239] tracking-widest font-['Orbitron'] uppercase">AL-FATH</h1>
                        <p className="text-[10px] font-medium text-[#5c3d2e] leading-tight">Universitas Telkom</p>
                    </div>
                </div>

                <nav className="space-y-3 flex-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 border-2 ${isActive
                                    ? "gradient-primary border-alfath-dark shadow-playful-sm translate-x-1"
                                    : "border-transparent hover:bg-muted hover:border-muted-foreground/20"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                                <span className={`font-semibold ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto">
                    <div className="p-4 rounded-xl bg-muted/50 border-2 border-dashed border-muted-foreground/30">
                        <p className="text-xs text-center text-muted-foreground">© 2026 Al-Fath App</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}

            <main className="flex-1 relative z-10 p-8 overflow-y-auto h-screen">

                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DesktopLayout;
