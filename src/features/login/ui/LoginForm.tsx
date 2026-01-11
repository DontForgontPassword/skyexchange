import { LoginInputField } from "./LoginInputField";
import { Button } from "@/shared/ui/Button";
import { useRegister } from "../model/useRegister";
import "./LoginForm.scss";

const LoginForm = () => {
    const {
        fields,
        setUsername,
        setEmail,
        setPassword,
        setConfirmPassword,
        errors,
        submit,
    } = useRegister();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                submit();
            }}
            className="login-form"
        >
            <LoginInputField
                label="Username"
                icon="user"
                value={fields.username}
                error={errors.username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <LoginInputField
                label="Email"
                icon="email"
                value={fields.email}
                error={errors.email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <LoginInputField
                label="Password"
                icon="password"
                type="password"
                value={fields.password}
                error={errors.password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <LoginInputField
                label="Confirm Password"
                icon="password"
                type="password"
                value={fields.confirmPassword}
                error={errors.confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" className="login-form__button">
                Create Account
            </Button>
        </form>
    );
};

export { LoginForm };
