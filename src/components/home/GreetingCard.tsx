import { Bell, Sparkles } from "lucide-react";

interface GreetingCardProps {
  name: string;
  tingkatKader: string;
}

const GreetingCard = ({ name, tingkatKader }: GreetingCardProps) => {
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  return (
    <div className="gradient-yellow border-playful-thick shadow-playful-lg rounded-3xl p-5 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-alfath-red rounded-full opacity-80" />
      <div className="absolute right-8 top-8 w-8 h-8 bg-alfath-blue rounded-full" />
      <div className="absolute -right-2 bottom-4 w-12 h-12 bg-alfath-green rounded-lg rotate-12" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-alfath-dark/70 text-sm font-medium flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              {getTimeGreeting()}
            </p>
            <h1 className="text-2xl font-extrabold text-alfath-dark mt-1">
              {name}
            </h1>
            <span className="inline-block mt-2 px-3 py-1 bg-alfath-dark text-primary text-xs font-bold rounded-full">
              {tingkatKader}
            </span>
          </div>
          <button className="w-12 h-12 bg-card border-playful rounded-xl flex items-center justify-center shadow-playful-sm active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all">
            <Bell className="w-5 h-5 text-alfath-dark" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GreetingCard;
