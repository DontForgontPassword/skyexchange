import "./Input.scss";
import { clsx } from "clsx";

function Input({ className, ...props }: React.ComponentProps<"input">) {
    return <input className={clsx("input", className)} {...props} />;
}

export { Input };
