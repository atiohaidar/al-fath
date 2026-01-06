import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFFBF0]">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Decorative Assets - Floating */}
      <img
        src="/assets/playful/Star/Merah.png"
        className="absolute top-10 left-10 w-24 h-24 opacity-80 rotate-12 animate-float pointer-events-none"
        alt=""
      />
      <img
        src="/assets/playful/Star/Biru.png"
        className="absolute bottom-20 right-10 w-32 h-32 opacity-80 -rotate-12 animate-float-delayed pointer-events-none"
        alt=""
      />
      <img
        src="/assets/playful/Star/Kuning.png"
        className="absolute top-1/4 right-20 w-16 h-16 opacity-60 rotate-45 pointer-events-none"
        alt=""
      />
      <img
        src="/assets/playful/Smiley/Asset 101@4x.png"
        className="absolute bottom-1/4 left-20 w-12 h-12 opacity-80 -rotate-6 pointer-events-none"
        alt=""
      />


      {/* Main Content Card */}
      <div className="relative z-10 px-4 w-full max-w-lg">
        <Card variant="playful" className="p-8 text-center relative overflow-visible">

          {/* Sticker "404" */}
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-2 bg-black rounded-lg transform rotate-3 blur-sm opacity-20"></div>
            <h1 className="relative text-8xl font-black text-alfath-red transform -rotate-3" style={{ textShadow: '4px 4px 0 #000' }}>
              404
            </h1>
            {/* Small badge sticker */}
            <div className="absolute -top-4 -right-8 bg-alfath-yellow border-2 border-black px-3 py-1 rounded-full transform rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-xs font-bold text-black">Oops!</span>
            </div>
          </div>

          <h2 className="text-2xl font-black text-foreground mb-2">
            Halaman Belum Dibuat
          </h2>
          <p className="text-muted-foreground font-medium mb-8">
            Maaf, halaman yang kamu cari sepertinya nyasar ke dimensi lain atau belum tersedia.
            <br />
            <span className="text-xs opacity-70 mt-1 block font-mono bg-muted/50 inline-block px-2 py-1 rounded mt-2">
              {location.pathname}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-bold rounded-xl"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>

            <Button
              onClick={() => navigate("/")}
              variant="gradient-primary" // Using our custom gradient variant
              className="shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all rounded-xl"
            >
              <Home className="h-4 w-4 mr-2" />
              Ke Halaman Utama
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
