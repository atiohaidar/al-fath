import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
    onComplete?: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const handleLoad = () => {
            // Start fade out immediately when page is loaded
            setIsFadingOut(true);

            // Hide after fade animation completes (500ms)
            setTimeout(() => {
                setIsVisible(false);
                onComplete?.();
            }, 500);
        };

        // Check if page is already loaded
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            // Wait for all resources to load
            window.addEventListener('load', handleLoad);
        }

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500",
                isFadingOut ? "opacity-0" : "opacity-100"
            )}
        >
            <div className="flex flex-col items-center gap-6">
                {/* Logo with pulse animation */}
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                    <div className="relative w-24 h-24 rounded-2xl bg-card border-playful flex items-center justify-center p-4 animate-bounce">
                        <img
                            src="/logo.png"
                            alt="Al-Fath"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                {/* Loading text */}
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-2xl font-bold text-foreground">
                        LDK Al-Fath
                    </h2>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
                        <div className="w-2 h-2 rounded-full bg-secondary animate-bounce [animation-delay:150ms]" />
                        <div className="w-2 h-2 rounded-full bg-accent animate-bounce [animation-delay:300ms]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
