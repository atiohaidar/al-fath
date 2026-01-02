import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import SectionLabel from "./SectionLabel";

interface InfoCardProps {
    label?: string;
    labelVariant?: "primary" | "secondary" | "accent" | "success";
    children: ReactNode;
    className?: string;
}

/**
 * Speech bubble-style info card like in the reference design
 * With optional label at the top
 */
const InfoCard = ({
    label,
    labelVariant = "primary",
    children,
    className,
}: InfoCardProps) => {
    return (
        <div className={cn("relative", className)}>
            {label && (
                <div className="absolute -top-4 left-4 z-10">
                    <SectionLabel variant={labelVariant}>{label}</SectionLabel>
                </div>
            )}
            <div
                className={cn(
                    "bg-card border-[3px] border-alfath-dark rounded-2xl p-5 shadow-playful",
                    label && "pt-6"
                )}
            >
                {children}
            </div>
        </div>
    );
};

export default InfoCard;
