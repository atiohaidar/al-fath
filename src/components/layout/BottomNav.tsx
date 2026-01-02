import { Home, Calendar, BookOpen, User, ClipboardCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: ClipboardCheck, label: "Amalan", path: "/amalan" },
  { icon: Calendar, label: "Event", path: "/events" },
  { icon: BookOpen, label: "Info", path: "/info" },
  { icon: User, label: "Profil", path: "/profile" },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t-2 border-alfath-dark safe-area-pb">
      <div className="max-w-md mx-auto flex justify-around items-center py-2 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "gradient-yellow border-playful shadow-playful-sm scale-105" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-alfath-dark" : ""}`} />
              <span className={`text-[10px] font-semibold ${isActive ? "text-alfath-dark" : ""}`}>
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
