import { Navigate, useLocation } from "react-router-dom";
import { JSX } from "react";
import { useAppSelector } from "../provider";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isLoading } = useAppSelector((state: any) => state.auth);
    const location = useLocation();

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace state={{ from: location }} />;
    }

    return children;
};