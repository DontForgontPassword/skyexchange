import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AppRoutes } from "./routes/AppRoutes";
import { Header } from "../widgets/Header";
import "./styles/index.scss";
import { useEffect } from "react";
import { UserAPI } from "@/entities/User/api/user";

function App() {
    useEffect(() => {
        UserAPI.getMe().then((res) => {
            console.log(res);
        });
    }, []);

    return (
        <BrowserRouter>
            <Header />
            <AppRoutes />
            <Toaster position="top-right" richColors />
        </BrowserRouter>
    );
}

export default App;
