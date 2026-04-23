import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { usePerformLoginMutation } from "../api/performLogin";
import { AuthorizationInput } from "../../shared";
import { loginSchema } from "../model/schema";
import { useAppDispatch } from "@/app/provider";
import { setUser, useGetMeQuery } from "@/entities/user";
import { useNavigate } from "react-router-dom";
import "./LoginForm.scss";

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loginUser, { isLoading }] = usePerformLoginMutation();
    const [fields, setFields] = useState({
        email: "",
        password: "",
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

        const result = loginSchema.safeParse(fields);

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
            console.log({
                email: result.data.email,
                password: result.data.password,
            });
            const response = await loginUser({
                email: result.data.email,
                password: result.data.password,
            }).unwrap();

            if (!response.success) {
                return;
            }

            dispatch(setUser(response.user));
            navigate("/");
        } catch (e: any) {
            console.error(e);
        }
    };

    return (
        <form className="login-form" onSubmit={onSubmit}>
            <div className="login-form__fields">
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
            </div>

            <Button
                type="submit"
                className="login-form__submit"
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Login"}
            </Button>
        </form>
    );
};

export { LoginForm };
