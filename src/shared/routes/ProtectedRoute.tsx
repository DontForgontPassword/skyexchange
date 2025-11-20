import { FC, ReactNode } from "react"
import { Navigate } from "react-router-dom";
import { useUser } from "../store/useUser";

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
    children
}) => {
    const isLoggedIn = useUser((s) => s.token);
    if (!isLoggedIn) return <Navigate to="/login" />;
    return <>{children}</>;
}