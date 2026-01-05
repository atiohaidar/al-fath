import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useParallax } from "@/hooks/use-parallax";

interface ParallaxDecorativeElementsProps {
    variant?: "corners" | "top" | "bottom" | "scattered" | "minimal";
    className?: string;
}

type DecorativeItem = {
    src: string;       // Image path
    position: string;  // Tailwind classes untuk posisi
    size: string;      // Tailwind classes untuk ukuran (w-X h-X)
    opacity: string;   // Tailwind classes untuk opacity
    rotation: string;  // Tailwind classes untuk rotasi
    preload?: boolean; // Preload this image for faster loading
    parallaxSpeed?: number; // Speed factor for parallax effect
};

// Wrapper component to apply parallax hook individually
const ParallaxImage = ({ item, isLoaded }: { item: DecorativeItem; isLoaded: boolean }) => {
    // Default low speed for subtle effect if not specified
    const speed = item.parallaxSpeed ?? 0.1;
    const { transform } = useParallax(speed);

    return (
        <img
            src={item.src}
            alt=""
            loading={item.preload ? "eager" : "lazy"}
            style={{ transform }}
            className={cn(
                "absolute transition-opacity duration-300 will-change-transform",
                item.position,
                item.size,
                item.opacity,
                item.rotation,
                !isLoaded && item.preload ? "opacity-0" : ""
            )}
        />
    );
};

const decorativeConfig: Record<string, DecorativeItem[]> = {
    corners: [
        { src: "/assets/playful/Star/Kuning.png", position: "-top-4 -left-4", size: "w-20 h-20", opacity: "opacity-70", rotation: "rotate-12", preload: true, parallaxSpeed: 0.2 },
        { src: "/assets/playful/Star/Biru.png", position: "-top-2 -right-6", size: "w-16 h-16", opacity: "opacity-60", rotation: "-rotate-6", preload: true, parallaxSpeed: 0.15 },
        { src: "/assets/playful/Star/Hijau.png", position: "-bottom-4 -left-6", size: "w-18 h-18", opacity: "opacity-60", rotation: "rotate-45", parallaxSpeed: 0.1 },
        { src: "/assets/playful/Star/Merah.png", position: "-bottom-2 -right-4", size: "w-14 h-14", opacity: "opacity-70", rotation: "-rotate-12", parallaxSpeed: 0.2 },
    ],

    top: [
        { src: "/assets/playful/Star/Kuning.png", position: "-top-4 left-4", size: "w-16 h-16", opacity: "opacity-80", rotation: "rotate-12", preload: true, parallaxSpeed: 0.2 },
        { src: "/assets/playful/Star/Biru.png", position: "top-2 right-8", size: "w-12 h-12", opacity: "opacity-60", rotation: "-rotate-6", parallaxSpeed: 0.1 },
        { src: "/assets/playful/Smiley/Asset 101@4x.png", position: "-top-2 left-1/3", size: "w-10 h-10", opacity: "opacity-50", rotation: "", parallaxSpeed: 0.3 },
    ],

    bottom: [
        { src: "/assets/playful/Star/Hijau.png", position: "-bottom-4 left-8", size: "w-14 h-14", opacity: "opacity-70", rotation: "rotate-45", parallaxSpeed: 0.1 },
        { src: "/assets/playful/Star/Merah.png", position: "bottom-4 right-4", size: "w-12 h-12", opacity: "opacity-60", rotation: "-rotate-12", parallaxSpeed: 0.15 },
        { src: "/assets/playful/Smiley/Asset 102@4x.png", position: "bottom-8 left-1/2", size: "w-8 h-8", opacity: "opacity-40", rotation: "", parallaxSpeed: 0.05 },
    ],

    minimal: [
        { src: "/assets/playful/Star/Kuning.png", position: "top-20 -right-4", size: "w-12 h-12", opacity: "opacity-40", rotation: "rotate-12", parallaxSpeed: 0.1 },
        { src: "/assets/playful/Star/Merah.png", position: "bottom-32 -left-4", size: "w-10 h-10", opacity: "opacity-35", rotation: "-rotate-12", parallaxSpeed: 0.1 },
    ],

    scattered: [
        // TOP RIGHT - Layered depths
        { src: "/assets/playful/Rectangle/Kotak Kuning.png", position: "-top-16 -right-20", size: "w-48 h-48", opacity: "opacity-70", rotation: "rotate-12", parallaxSpeed: 0.05 }, // Background
        { src: "/assets/playful/Star/Merah.png", position: "top-2 right-6", size: "w-16 h-16", opacity: "opacity-85", rotation: "rotate-6", preload: true, parallaxSpeed: 0.3 }, // Foreground
        { src: "/assets/playful/Rectangle/Masya Allah.png", position: "-top-0 right-9", size: "w-32 h-32", opacity: "opacity-85", rotation: "-rotate-6", parallaxSpeed: 0.2 },
        { src: "/assets/playful/Star/Biru.png", position: "top-12 -right-4", size: "w-14 h-14", opacity: "opacity-70", rotation: "-rotate-12", parallaxSpeed: 0.1 },
        { src: "/assets/playful/Star/Hijau.png", position: "top-24 right-6", size: "w-12 h-12", opacity: "opacity-60", rotation: "rotate-45", parallaxSpeed: 0.15 },

        // TOP LEFT
        { src: "/assets/playful/Rectangle/Kotak Biru.png", position: "-top-20 -left-24", size: "w-52 h-52", opacity: "opacity-65", rotation: "-rotate-12", parallaxSpeed: 0.05 },
        { src: "/assets/playful/Rectangle/Kotak Kuning.png", position: "-top-4 -left-12", size: "w-36 h-36", opacity: "opacity-55", rotation: "rotate-6", parallaxSpeed: 0.08 },
        { src: "/assets/playful/Star/SHEEESH.png", position: "top-4 left-4", size: "w-20 h-20", opacity: "opacity-80", rotation: "-rotate-6", parallaxSpeed: 0.4 },
        { src: "/assets/playful/Star/Kuning.png", position: "top-20 -left-2", size: "w-14 h-14", opacity: "opacity-70", rotation: "rotate-12", parallaxSpeed: 0.15 },

        // MIDDLE
        { src: "/assets/playful/Star/Hijau.png", position: "top-1/3 -left-6", size: "w-16 h-16", opacity: "opacity-55", rotation: "rotate-45", parallaxSpeed: 0.1 },
        { src: "/assets/playful/Smiley/Asset 103@4x.png", position: "top-[40%] left-2", size: "w-10 h-10", opacity: "opacity-45", rotation: "", parallaxSpeed: 0.25 },
        { src: "/assets/playful/Star/Ungu.png", position: "top-1/2 -right-6", size: "w-16 h-16", opacity: "opacity-50", rotation: "-rotate-12", parallaxSpeed: 0.1 },
        { src: "/assets/playful/Smiley/Asset 101@4x.png", position: "top-[55%] right-4", size: "w-10 h-10", opacity: "opacity-40", rotation: "", parallaxSpeed: 0.2 },

        // BOTTOM LEFT
        { src: "/assets/playful/Rectangle/Kotak Merah.png", position: "-bottom-2 -left-2", size: "w-52 h-52", opacity: "opacity-65", rotation: "rotate-12", parallaxSpeed: 0.05 },
        { src: "/assets/playful/Rectangle/Kotak Kuning.png", position: "-bottom-2 -left-2", size: "w-36 h-36", opacity: "opacity-55", rotation: "-rotate-6", parallaxSpeed: 0.08 },
        { src: "/assets/playful/Star/SHEEESH.png", position: "bottom-2 left-2", size: "w-24 h-24", opacity: "opacity-75", rotation: "rotate-6", parallaxSpeed: 0.35 },
        { src: "/assets/playful/Star/Biru.png", position: "bottom-40 left-20", size: "w-12 h-12", opacity: "opacity-60", rotation: "-rotate-12", parallaxSpeed: 0.15 },

        // BOTTOM RIGHT
        { src: "/assets/playful/Rectangle/Kotak Biru.png", position: "-bottom-2 -right-2", size: "w-48 h-48", opacity: "opacity-60", rotation: "-rotate-6", parallaxSpeed: 0.05 },
        { src: "/assets/playful/Star/Merah.png", position: "bottom-20 right-2", size: "w-14 h-14", opacity: "opacity-50", rotation: "rotate-45", parallaxSpeed: 0.1 },
        { src: "/assets/playful/Rectangle/Letsgoo.png", position: "bottom-2 right-2", size: "w-28 h-28", opacity: "opacity-80", rotation: "rotate-3", parallaxSpeed: 0.3 },
        { src: "/assets/playful/Star/SHEEESH.png", position: "bottom-24 right-20", size: "w-16 h-16", opacity: "opacity-70", rotation: "rotate-12", parallaxSpeed: 0.2 },
        { src: "/assets/playful/Star/Kuning.png", position: "bottom-32 right-3", size: "w-12 h-12", opacity: "opacity-55", rotation: "-rotate-6", parallaxSpeed: 0.15 },

        // CENTER (Background)
        { src: "/logo.png", position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", size: "", opacity: "opacity-20", rotation: "", parallaxSpeed: 0.02 },
        { src: "/assets/playful/Smiley/Asset 102@4x.png", position: "top-2/3 left-1/2 -translate-x-1/2", size: "w-8 h-8", opacity: "opacity-35", rotation: "", parallaxSpeed: 0.1 },
    ],
};

const ParallaxDecorativeElements = ({
    variant = "corners",
    className,
}: ParallaxDecorativeElementsProps) => {
    const items = decorativeConfig[variant];
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Preload critical images
    useEffect(() => {
        const imagesToPreload = items
            .filter(item => item.preload)
            .map(item => item.src);

        if (imagesToPreload.length === 0) {
            setImagesLoaded(true);
            return;
        }

        const preloadImages = imagesToPreload.map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = src;
            });
        });

        Promise.all(preloadImages)
            .then(() => setImagesLoaded(true))
            .catch(() => setImagesLoaded(true));
    }, [variant, items]);

    if (!items) return null;

    return (
        <div className={cn("pointer-events-none fixed inset-0 z-0 overflow-hidden", className)}>
            {items.map((item, index) => (
                <ParallaxImage
                    key={index}
                    item={item}
                    isLoaded={imagesLoaded}
                />
            ))}
        </div>
    );
};

export default ParallaxDecorativeElements;
