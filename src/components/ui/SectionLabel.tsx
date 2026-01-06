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
        primary: "bg-primary text-primary-foreground", // Red in the new theme
        secondary: "bg-secondary text-secondary-foreground", // Blue
        accent: "bg-accent text-accent-foreground", // Yellow
        success: "bg-success text-success-foreground", // Green
    };

    return (
        <div
            className={cn(
                "inline-block px-5 py-2 rounded-full border-3 border-alfath-dark font-extrabold text-sm shadow-pop-sm uppercase tracking-wider",
                variantClasses[variant],
                className
            )}
        >
            {children}
        </div>
    );
};

export default SectionLabel;
