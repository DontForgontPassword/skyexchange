import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../provider/context/useAppSelector";
import { Skeleton } from "@/shared/ui/Skeleton";

interface Props {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
    const { isAuthenticated, isLoading } = useAppSelector(
        (state) => state.auth,
    );

    if (isLoading) {
        return <Skeleton />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    return children;
};
