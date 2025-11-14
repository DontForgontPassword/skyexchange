import { FC, ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
     children: ReactNode;
     variant?: "primary";
     size?: "sm" | "md" | "lg";
}

const Button: FC<ButtonProps> = ({
     children,
     variant = "primary",
     size = "md",
     className,
     ...props
}) => {
     return (
          <button
               {...props}
               className={clsx("button", variant ?? `button--${variant}`, `button--${size}`, className)}
          >
               {children}
          </button>
     );
};

export default Button;
