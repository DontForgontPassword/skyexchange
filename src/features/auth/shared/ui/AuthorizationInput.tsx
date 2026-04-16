import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { clsx } from "clsx";
import "./AuthorizationInput.scss";

interface Props extends React.ComponentProps<"input"> {
    label: string;
    icon: "user" | "email" | "password";
    error: string;
}

const AuthorizationInput = ({
    icon,
    label,
    error,
    ...props
}: Props) => {
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
                "authorization-input__input",
                error && "authorization-input__input--error",
            )}
            id={props.id}
            type={inputType}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    );

    return (
        <div className="authorization-input__group">
            <label className="authorization-input__label" htmlFor={props.id}>
                {renderIcon()}
                {label}
            </label>
            {props.type === "password" ? (
                <div className="authorization-input__input-wrapper">
                    {input}
                    <Button
                        type="button"
                        className="authorization-input__password-button"
                        variant="default"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? (
                            <Eye
                                width={18}
                                height={18}
                                className="authorization-input__icon"
                            />
                        ) : (
                            <EyeOff
                                width={18}
                                height={18}
                                className="authorization-input__icon"
                            />
                        )}
                    </Button>
                </div>
            ) : (
                input
            )}
            {error && <p className="authorization-input__error">{error}</p>}
        </div>
    );
};

export { AuthorizationInput };
