import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import DecorativeElements from "@/components/ui/DecorativeElements";

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Decorative Background */}
      <DecorativeElements />

      {/* Content */}
      <div className="relative z-10 mx-4 max-w-md text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <FileQuestion className="h-20 w-20 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="mb-4 text-7xl font-bold text-primary">404</h1>

        {/* Bilingual Message */}
        <div className="mb-2 space-y-1">
          <h2 className="text-2xl font-semibold text-foreground">
            Halaman Belum Dibuat
          </h2>
          <p className="text-lg text-muted-foreground">
            Page Not Found
          </p>
        </div>

        {/* Description */}
        <p className="mb-8 text-sm text-muted-foreground">
          Maaf, halaman yang Anda cari belum tersedia atau sedang dalam pengembangan.
          <br />
          <span className="text-xs">
            Sorry, the page you're looking for is not available or under development.
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={handleGoBack}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali / Go Back
          </Button>

          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Halaman Utama / Home
          </Button>
        </div>

        {/* Path Info (for debugging) */}
        {location.pathname && (
          <div className="mt-8 rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">
              Requested path: <code className="rounded bg-muted px-1 py-0.5 font-mono">{location.pathname}</code>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotFound;
