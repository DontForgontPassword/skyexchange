import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AppRoutes } from "./routes/AppRoutes";
import { Header } from "../widgets/header";
import "./styles/index.scss";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <AppRoutes />
            <Toaster position="top-right" richColors />
        </BrowserRouter>
    );
}

export default App;
