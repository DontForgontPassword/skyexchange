import { Button } from "@/shared/ui/Button";
import "./AppInitError.scss";

const AppInitError = () => {
    const reloadPage = () => {
        window.location.reload();
    }

    return <div className="app-error">
        <h1>App initialization failed</h1>
        <p className="app-error__message">
            Failed to initalize the app, reload page and try again.
        </p>
        <Button className="app-error__reload" variant="default" onClick={reloadPage}>Reload</Button>
    </div>
}

export { AppInitError };