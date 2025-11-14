import { FC, ReactNode } from "react"
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
    children
}) => {
    const isLoggedIn = Boolean(localStorage.getItem("token"));
    if (!isLoggedIn) return <Navigate to="/login" />;
    return <>{children}</>;
}