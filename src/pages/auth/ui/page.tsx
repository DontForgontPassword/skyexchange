import { useState } from "react";
import { User } from "lucide-react";
import { clsx } from "clsx";
import { AuthTypes } from "@/features/auth/shared";
import { RegisterForm } from "@/features/auth/register";
import { LoginForm } from "@/features/auth/login";
import "./page.scss";

const AuthPage = () => {
    const [authorizationType, setAuthorizationType] =
        useState<AuthTypes>("login");

    return (
        <section className="login-page">
            <div className="login-page__content">
                <header className="login-page__header">
                    <div className="login-page__switch">
                        <button
                            onClick={() => setAuthorizationType("login")}
                            className={clsx(
                                "login-page__switch-btn",
                                authorizationType === "login" &&
                                    "login-page__switch-btn--active",
                            )}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setAuthorizationType("register")}
                            className={clsx(
                                "login-page__switch-btn",
                                authorizationType === "register" &&
                                    "login-page__switch-btn--active",
                            )}
                        >
                            Register
                        </button>
                    </div>

                    <div className="login-page__title">
                        <div className="login-page__logo">
                            <User
                                width={40}
                                height={40}
                                color="var(--muted-foreground)"
                            />
                        </div>
                        <h2 className="login-page__heading">Create Account</h2>
                    </div>
                </header>

                {authorizationType === "login" ? (
                    <LoginForm />
                ) : (
                    <RegisterForm />
                )}
            </div>
        </section>
    );
};

export { AuthPage };
