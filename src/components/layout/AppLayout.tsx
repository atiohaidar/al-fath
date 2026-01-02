import { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";

interface AppLayoutProps {
    children: ReactNode;
    showNav?: boolean;
    showDecorations?: boolean;
}

const AppLayout = ({ children, showNav, showDecorations }: AppLayoutProps) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <MobileLayout showNav={showNav} showDecorations={showDecorations}>
                {children}
            </MobileLayout>
        );
    }

    return (
        <DesktopLayout showDecorations={showDecorations}>
            {children}
        </DesktopLayout>
    );
};

export default AppLayout;
