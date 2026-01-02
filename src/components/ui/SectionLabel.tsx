import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionLabelProps {
    children: ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "accent" | "success";
}

/**
 * Pill-shaped section label component like in the reference design
 * e.g. "Pengertian", "Buat Apa?"
 */
const SectionLabel = ({
    children,
    className,
    variant = "primary",
}: SectionLabelProps) => {
    const variantClasses = {
        primary: "bg-alfath-yellow text-alfath-dark",
        secondary: "bg-alfath-blue text-white",
        accent: "bg-alfath-red text-white",
        success: "bg-alfath-green text-white",
    };

    return (
        <div
            className={cn(
                "inline-block px-4 py-1.5 rounded-full border-2 border-alfath-dark font-bold text-sm shadow-playful-sm",
                variantClasses[variant],
                className
            )}
        >
            {children}
        </div>
    );
};

export default SectionLabel;
