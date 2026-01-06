import { Bell, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <Card variant="greeting" className="p-5 relative overflow-hidden">
      {/* Decorative star elements */}
      <img
        src="/assets/playful/Star/Merah.png"
        alt=""
        className="absolute -right-4 -top-4 w-16 h-16 opacity-40 rotate-12 pointer-events-none brightness-0 invert"
      />
      <img
        src="/assets/playful/Star/Biru.png"
        alt=""
        className="absolute right-10 top-8 w-10 h-10 opacity-35 -rotate-6 pointer-events-none brightness-0 invert"
      />
      <img
        src="/assets/playful/Star/Hijau.png"
        alt=""
        className="absolute -right-2 bottom-2 w-12 h-12 opacity-35 rotate-45 pointer-events-none brightness-0 invert"
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-primary-foreground/95 text-base font-semibold flex items-center gap-1.5">
              <Sparkles className="w-5 h-5" />
              {getTimeGreeting()}
            </p>
            <h1 className="text-2xl font-extrabold text-white mt-1.5">
              {name}
            </h1>
            <Badge variant="playful-green" className="mt-2 bg-white/20 text-white backdrop-blur-sm border-white/20">
              {tingkatKader}
            </Badge>
          </div>
          <Button variant="playful" size="icon-playful" className="bg-card">
            <Bell className="w-5 h-5 text-alfath-dark" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GreetingCard;
