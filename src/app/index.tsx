import { HashRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AppRoutes } from "./routes/AppRoutes";
import { Header } from "../widgets/Header";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./provider/store/store";
import { AppInit } from "./layout/AppInit";
import "./styles/index.scss";

const App = () => {
    return (
        <ReduxProvider store={store}>
            <HashRouter>
                <AppInit>
                    <Header />
                    <AppRoutes />
                    <Toaster position="bottom-right" />
                </AppInit>
            </HashRouter>
        </ReduxProvider>
    );
};

export default App;
