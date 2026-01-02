import { cn } from "@/lib/utils";

interface DecorativeElementsProps {
    variant?: "corners" | "top" | "bottom" | "scattered" | "minimal";
    className?: string;
}

/**
 * Decorative elements component for playful UI design
 * Uses assets from /Segala Aset folder
 */
const DecorativeElements = ({
    variant = "corners",
    className,
}: DecorativeElementsProps) => {
    if (variant === "corners") {
        return (
            <div className={cn("pointer-events-none fixed inset-0 z-0 overflow-hidden", className)}>
                {/* Top Left - Yellow Star */}
                <img
                    src="/Segala Aset/Star/Kuning.png"
                    alt=""
                    className="absolute -top-4 -left-4 w-20 h-20 opacity-70 rotate-12"
                />
                {/* Top Right - Blue Star */}
                <img
                    src="/Segala Aset/Star/Biru.png"
                    alt=""
                    className="absolute -top-2 -right-6 w-16 h-16 opacity-60 -rotate-6"
                />
                {/* Bottom Left - Green Star */}
                <img
                    src="/Segala Aset/Star/Hijau.png"
                    alt=""
                    className="absolute -bottom-4 -left-6 w-18 h-18 opacity-60 rotate-45"
                />
                {/* Bottom Right - Red Star */}
                <img
                    src="/Segala Aset/Star/Merah.png"
                    alt=""
                    className="absolute -bottom-2 -right-4 w-14 h-14 opacity-70 -rotate-12"
                />
            </div>
        );
    }

    if (variant === "top") {
        return (
            <div className={cn("pointer-events-none absolute top-0 left-0 right-0 h-32 overflow-hidden", className)}>
                <img
                    src="/Segala Aset/Star/Kuning.png"
                    alt=""
                    className="absolute -top-4 left-4 w-16 h-16 opacity-80 rotate-12"
                />
                <img
                    src="/Segala Aset/Star/Biru.png"
                    alt=""
                    className="absolute top-2 right-8 w-12 h-12 opacity-60 -rotate-6"
                />
                <img
                    src="/Segala Aset/Smiley/Asset 101@4x.png"
                    alt=""
                    className="absolute -top-2 left-1/3 w-10 h-10 opacity-50"
                />
            </div>
        );
    }

    if (variant === "bottom") {
        return (
            <div className={cn("pointer-events-none absolute bottom-0 left-0 right-0 h-32 overflow-hidden", className)}>
                <img
                    src="/Segala Aset/Star/Hijau.png"
                    alt=""
                    className="absolute -bottom-4 left-8 w-14 h-14 opacity-70 rotate-45"
                />
                <img
                    src="/Segala Aset/Star/Merah.png"
                    alt=""
                    className="absolute bottom-4 right-4 w-12 h-12 opacity-60 -rotate-12"
                />
                <img
                    src="/Segala Aset/Smiley/Asset 102@4x.png"
                    alt=""
                    className="absolute bottom-8 left-1/2 w-8 h-8 opacity-40"
                />
            </div>
        );
    }

    if (variant === "scattered") {
        return (
            <div className={cn("pointer-events-none fixed inset-0 z-0 overflow-hidden", className)}>
                {/* ===== TOP RIGHT CORNER - Heavy stacking ===== */}
                {/* Background large shapes */}
                <img
                    src="/assets/playful/Rectangle/Kotak Kuning.png"
                    alt=""
                    className="absolute -top-16 -right-20 w-48 h-48 opacity-70 rotate-12"
                />
                <img
                    src="/assets/playful/Rectangle/Kotak Biru.png"
                    alt=""
                    className="absolute -top-8 right-8 w-32 h-32 opacity-60 -rotate-6"
                />
                {/* Stars on top */}
                <img
                    src="/assets/playful/Star/Merah.png"
                    alt=""
                    className="absolute top-2 right-2 w-16 h-16 opacity-85 rotate-6"
                />
                <img
                    src="/assets/playful/Star/Biru.png"
                    alt=""
                    className="absolute top-12 -right-4 w-14 h-14 opacity-70 -rotate-12"
                />
                <img
                    src="/assets/playful/Star/Hijau.png"
                    alt=""
                    className="absolute top-24 right-6 w-12 h-12 opacity-60 rotate-45"
                />

                {/* ===== TOP LEFT CORNER - Heavy stacking ===== */}
                <img
                    src="/assets/playful/Rectangle/Kotak Biru.png"
                    alt=""
                    className="absolute -top-20 -left-24 w-52 h-52 opacity-65 -rotate-12"
                />
                <img
                    src="/assets/playful/Rectangle/Kotak Kuning.png"
                    alt=""
                    className="absolute -top-4 -left-12 w-36 h-36 opacity-55 rotate-6"
                />
                <img
                    src="/assets/playful/Star/SHEEESH.png"
                    alt=""
                    className="absolute top-4 left-4 w-20 h-20 opacity-80 -rotate-6"
                />
                <img
                    src="/assets/playful/Star/Kuning.png"
                    alt=""
                    className="absolute top-20 -left-2 w-14 h-14 opacity-70 rotate-12"
                />

                {/* ===== MIDDLE LEFT ===== */}
                <img
                    src="/assets/playful/Star/Hijau.png"
                    alt=""
                    className="absolute top-1/3 -left-6 w-16 h-16 opacity-55 rotate-45"
                />
                <img
                    src="/assets/playful/Smiley/Asset 103@4x.png"
                    alt=""
                    className="absolute top-[40%] left-2 w-10 h-10 opacity-45"
                />

                {/* ===== MIDDLE RIGHT ===== */}
                <img
                    src="/assets/playful/Star/Ungu.png"
                    alt=""
                    className="absolute top-1/2 -right-6 w-16 h-16 opacity-50 -rotate-12"
                />
                <img
                    src="/assets/playful/Smiley/Asset 101@4x.png"
                    alt=""
                    className="absolute top-[55%] right-4 w-10 h-10 opacity-40"
                />

                {/* ===== BOTTOM LEFT CORNER - Heavy stacking ===== */}
                <img
                    src="/assets/playful/Rectangle/Kotak Merah.png"
                    alt=""
                    className="absolute -bottom-20 -left-24 w-52 h-52 opacity-65 rotate-12"
                />
                <img
                    src="/assets/playful/Rectangle/Kotak Kuning.png"
                    alt=""
                    className="absolute -bottom-8 -left-8 w-36 h-36 opacity-55 -rotate-6"
                />
                <img
                    src="/assets/playful/Rectangle/Masya Allah.png"
                    alt=""
                    className="absolute bottom-8 left-2 w-24 h-24 opacity-75 rotate-6"
                />
                <img
                    src="/assets/playful/Star/Biru.png"
                    alt=""
                    className="absolute bottom-4 left-20 w-12 h-12 opacity-60 -rotate-12"
                />

                {/* ===== BOTTOM RIGHT CORNER - Heavy stacking ===== */}
                <img
                    src="/assets/playful/Rectangle/Kotak Biru.png"
                    alt=""
                    className="absolute -bottom-16 -right-20 w-48 h-48 opacity-60 -rotate-6"
                />
                <img
                    src="/assets/playful/Rectangle/Letsgoo.png"
                    alt=""
                    className="absolute bottom-4 right-2 w-28 h-28 opacity-80 rotate-3"
                />
                <img
                    src="/assets/playful/Star/SHEEESH.png"
                    alt=""
                    className="absolute bottom-24 -right-4 w-16 h-16 opacity-70 rotate-12"
                />
                <img
                    src="/assets/playful/Star/Kuning.png"
                    alt=""
                    className="absolute bottom-32 right-8 w-12 h-12 opacity-55 -rotate-6"
                />
                <img
                    src="/assets/playful/Star/Merah.png"
                    alt=""
                    className="absolute bottom-40 -right-2 w-14 h-14 opacity-50 rotate-45"
                />

                {/* ===== CENTER DECORATIONS ===== */}
                <img
                    src="/assets/playful/Smiley/Asset 102@4x.png"
                    alt=""
                    className="absolute top-2/3 left-1/2 -translate-x-1/2 w-8 h-8 opacity-35"
                />
            </div>
        );
    }

    if (variant === "minimal") {
        return (
            <div className={cn("pointer-events-none fixed inset-0 z-0 overflow-hidden", className)}>
                <img
                    src="/Segala Aset/Star/Kuning.png"
                    alt=""
                    className="absolute top-20 -right-4 w-12 h-12 opacity-40 rotate-12"
                />
                <img
                    src="/Segala Aset/Star/Merah.png"
                    alt=""
                    className="absolute bottom-32 -left-4 w-10 h-10 opacity-35 -rotate-12"
                />
            </div>
        );
    }

    return null;
};

export default DecorativeElements;
