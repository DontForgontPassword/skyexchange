import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/shared/ui/Input";
import "./LoginInputField.scss";
import { Button } from "@/shared/ui/Button";
import { clsx } from "clsx";

interface LoginInputFieldProps extends React.ComponentProps<"input"> {
    label: string;
    icon: "user" | "email" | "password";
    error: string;
}

const LoginInputField = ({
    icon,
    label,
    error,
    ...props
}: LoginInputFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const renderIcon = () => {
        switch (icon) {
            case "user":
                return <User color="var(--primary)" width={16} height={16} />;
            case "email":
                return <Mail color="var(--primary)" width={16} height={16} />;
            case "password":
                return <Lock color="var(--primary)" width={16} height={16} />;
        }
    };

    const inputType =
        props.type === "password"
            ? showPassword
                ? "text"
                : "password"
            : props.type;

    const input = (
        <Input
            className={clsx(
                "login-input__input",
                error && "login-input__input--error"
            )}
            id={props.id}
            type={inputType}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    );

    return (
        <div className="login-input__group">
            <label className="login-input__label" htmlFor={props.id}>
                {renderIcon()}
                {label}
            </label>
            {props.type === "password" ? (
                <div className="login-input__input-wrapper">
                    {input}
                    <Button
                        className="login-input__password-button"
                        variant="default"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? (
                            <Eye
                                width={18}
                                height={18}
                                className="login-input__icon"
                            />
                        ) : (
                            <EyeOff
                                width={18}
                                height={18}
                                className="login-input__icon"
                            />
                        )}
                    </Button>
                </div>
            ) : (
                input
            )}
            {error && <p className="login-input__error">{error}</p>}
        </div>
    );
};

export { LoginInputField };
