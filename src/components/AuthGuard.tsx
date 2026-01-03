import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepositories } from "@/hooks/use-repositories";
import { ROUTES } from "@/lib/routes";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const navigate = useNavigate();
    const { authRepository } = useRepositories();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await authRepository.getCurrentUser();
                if (!user) {
                    navigate(ROUTES.AUTH);
                }
            } catch (error) {
                console.error("Auth guard error", error);
                navigate(ROUTES.AUTH);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [authRepository, navigate]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
