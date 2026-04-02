import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AppRoutes } from "./routes/AppRoutes";
import { Header } from "../widgets/Header";
import "./styles/index.scss";
import { useMe } from "@/entities/user";

function App() {
    useMe();

    return (
        <BrowserRouter>
            <Header />
            <AppRoutes />
            <Toaster position="top-right" richColors />
        </BrowserRouter>
    );
}

export default App;
