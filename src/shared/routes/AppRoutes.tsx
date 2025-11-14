import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoutingList } from "../constants/Routing";

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
                ) : null
            )}
        </Routes>
    );
};
