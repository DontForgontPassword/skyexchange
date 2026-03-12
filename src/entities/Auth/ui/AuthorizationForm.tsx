import { AuthorizationInput } from "./AuthorizationInput";
import { Button } from "@/shared/ui/Button";
import { IAuthTypes, useAuthStore, validateFields } from "@/entities/Auth";
import { useState } from "react";
import { toast } from "sonner";
import "./AuthorizationForm.scss";

interface AuthorizationFormProps {
    type: IAuthTypes;
}

const AuthorizationForm = ({ type }: AuthorizationFormProps) => {
    const register = useAuthStore((s) => s.register);
    const login = useAuthStore((s) => s.login);

    const [fields, setFields] = useState({
        username: "asdwfwefew",
        email: "ewfwef@gmail.com",
        password: "SDJsdsdj2323",
        confirmPassword: "SDJsdsdj2323",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange =
        (field: keyof typeof fields) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFields((prev) => ({
                ...prev,
                [field]: e.target.value,
            }));
        };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (type === "register") {
            const validation = validateFields(
                fields.username,
                fields.email,
                fields.password,
                fields.confirmPassword,
            );

            if (Object.keys(validation).length) {
                setErrors(validation);
                return;
            }

            setErrors({});
        }

        let response;
        if (type === "register") {
            response = await register(
                fields.username,
                fields.email,
                fields.password,
            );
        } else {
            response = await login(fields.email, fields.password);
        }

        if (!response.status) {
            toast.error(response.message);
            return;
        }

        toast.success(
            type === "register"
                ? "Account created successfully"
                : "Logged in successfully",
        );
    };

    const renderInputs = () => (
        <>
            {type === "register" && (
                <AuthorizationInput
                    label="Username"
                    icon="user"
                    value={fields.username}
                    error={errors.username}
                    onChange={handleChange("username")}
                />
            )}

            <AuthorizationInput
                label="Email"
                icon="email"
                value={fields.email}
                error={errors.email}
                onChange={handleChange("email")}
            />

            <AuthorizationInput
                label="Password"
                icon="password"
                type="password"
                value={fields.password}
                error={errors.password}
                onChange={handleChange("password")}
            />

            {type === "register" && (
                <AuthorizationInput
                    label="Confirm Password"
                    icon="password"
                    type="password"
                    value={fields.confirmPassword}
                    error={errors.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                />
            )}
        </>
    );

    return (
        <form className="auth-form" onSubmit={onSubmit}>
            <div className="auth-form__fields">{renderInputs()}</div>

            <Button type="submit" className="auth-form__submit">
                {type === "register" ? "Create Account" : "Login"}
            </Button>
        </form>
    );
};

export { AuthorizationForm };
