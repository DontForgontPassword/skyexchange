import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { registerSchema } from "../model/schema";
import { AuthorizationInput } from "../../shared";
import { usePerformRegisterMutation } from "../api/performRegister";
import "./RegisterForm.scss";

const RegisterForm = () => {
    const [registerUser, { isLoading }] = usePerformRegisterMutation();

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

        const result = registerSchema.safeParse(fields);

        if (!result.success) {
            const newErrors: Record<string, string> = {};

            result.error.issues.forEach((err) => {
                const field = err.path[0] as string;
                newErrors[field] = err.message;
            });

            setErrors(newErrors);
            return;
        }

        setErrors({});

        try {
            await registerUser({
                username: result.data.username,
                email: result.data.email,
                password: result.data.password,
            }).unwrap();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form className="register-form" onSubmit={onSubmit}>
            <div className="register-form__fields">
                <AuthorizationInput
                    label="Username"
                    icon="user"
                    type="text"
                    value={fields.username}
                    error={errors.username}
                    onChange={handleChange("username")}
                />

                <AuthorizationInput
                    label="Email"
                    icon="email"
                    type="email"
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

                <AuthorizationInput
                    label="Confirm Password"
                    icon="password"
                    type="password"
                    value={fields.confirmPassword}
                    error={errors.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                />
            </div>

            <Button
                type="submit"
                className="register-form__submit"
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Create Account"}
            </Button>
        </form>
    );
};

export { RegisterForm };
