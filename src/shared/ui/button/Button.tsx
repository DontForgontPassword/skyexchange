import { clsx } from "clsx";
import "./Button.scss";

interface Props extends React.ComponentProps < "button" > {
    variant?: "default" | "dark" | "destructive" | "outline" | "transparent" | "outline-destructive";
    size?: "default" | "sm" | "lg";
    className?: string;
}

const Button = ({
    variant = "default",
    size = "default",
    className,
    ...props
}: Props) => {
    return (
        <button
            className={clsx(
                "button",
                `button--variant-${variant}`,
                `button--size-${size}`,
                className,
            )}
            {...props}
        >
            {props.children}
        </button>
    );
};

export { Button };
