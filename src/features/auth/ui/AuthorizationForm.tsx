import { AuthorizationInput } from "./AuthorizationInput";
import { Button } from "@/shared/ui/Button";
import {
    IAuthTypes,
    validateFields,
    useLogin,
    useRegister,
} from "@/features/auth";
import { useState } from "react";
import { toast } from "sonner";
import "./AuthorizationForm.scss";

interface AuthorizationFormProps {
    type: IAuthTypes;
}

const AuthorizationForm = ({ type }: AuthorizationFormProps) => {
    const { mutateAsync: login, isPending: isLoginLoading } = useLogin();
    const { mutateAsync: register, isPending: isRegisterLoading } =
        useRegister();

    const isLoading = type === "register" ? isRegisterLoading : isLoginLoading;

    const [fields, setFields] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        try {
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

                await register({
                    username: fields.username,
                    email: fields.email,
                    password: fields.password,
                });

                toast.success("Account created successfully");
            } else {
                await login({
                    email: fields.email,
                    password: fields.password,
                });

                toast.success("Logged in successfully");
            }
        } catch (error: any) {
            const message =
                error?.response?.data?.detail || "Something went wrong";

            toast.error(message);
        }
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

            <Button
                type="submit"
                className="auth-form__submit"
                disabled={isLoading}
            >
                {isLoading
                    ? "Loading..."
                    : type === "register"
                      ? "Create Account"
                      : "Login"}
            </Button>
        </form>
    );
};

export { AuthorizationForm };
