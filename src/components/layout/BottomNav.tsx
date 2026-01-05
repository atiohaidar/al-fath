import { Home, Calendar, BookOpen, User, ClipboardCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "@/config/nav-items";

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t-2 border-alfath-dark safe-area-pb">
      <div className="max-w-md mx-auto flex justify-around items-center py-3 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 min-w-[60px] ${isActive
                ? "gradient-primary border-playful shadow-playful-sm scale-105"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? "text-primary-foreground" : ""}`} />
              <span className={`text-[10px] font-semibold ${isActive ? "text-primary-foreground" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
