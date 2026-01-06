import { ReactNode } from "react";
import BottomNav from "./BottomNav";
import DecorativeElements from "@/components/ui/DecorativeElements";

interface MobileLayoutProps {
  children: ReactNode;
  showNav?: boolean;
  showDecorations?: boolean;
}

const MobileLayout = ({
  children,
  showNav = true,
  showDecorations = true
}: MobileLayoutProps) => {
  return (
    <div className="min-h-screen max-w-md mx-auto relative overflow-hidden">
      {/* Paper texture background */}
      <div
        className="fixed inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url('/assets/playful/Texture/grid full.png')`,
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Decorative elements */}
      {showDecorations && <DecorativeElements variant="scattered" />}

      {/* Main content */}
      <main className={`relative z-10 ${showNav ? "pb-24" : ""}`}>
        {children}
      </main>

      {showNav && <BottomNav />}
    </div>
  );
};

export default MobileLayout;
