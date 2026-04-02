import { Routes, Route, Navigate } from "react-router-dom";
import { RoutingList } from "./Config";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
    return (
        <Routes>
            {RoutingList.map(({ to, authRequired, page: Page }) =>
                Page ? (
                    <Route
                        key={to}
                        path={to}
                        element={
                            authRequired ? (
                                <ProtectedRoute>
                                    <Page />
                                </ProtectedRoute>
                            ) : (
                                <Page />
                            )
                        }
                    />
                ) : null,
            )}
        </Routes>
    );
};
