import { LoginForm } from "@/features/login/ui/LoginForm";
import { User } from "lucide-react";
import "./LoginPage.scss";

const LoginPage = () => {
    return (
        <section className="login-page">
            <div className="login-page__content">
                <div className="login-page__header">
                    <User width={40} height={40} />
                    <h2>Create Account</h2>
                </div>
                <LoginForm />
            </div>
        </section>
    );
};

export { LoginPage };
