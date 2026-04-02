import { AuthorizationForm, IAuthTypes } from "@/features/auth";
import { useState } from "react";
import { User } from "lucide-react";
import { clsx } from "clsx";
import "./page.scss";

const LoginPage = () => {
    const [authorizationType, setAuthorizationType] =
        useState<IAuthTypes>("register");

    return (
        <section className="login-page">
            <div className="login-page__content">
                <header className="login-page__header">
                    <div className="login-page__switch">
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
                    </div>

                    <div className="login-page__title">
                        <div className="login-page__logo">
                            <User width={40} height={40} />
                        </div>
                        <h2 className="login-page__heading">Create Account</h2>
                    </div>
                </header>

                <AuthorizationForm type={authorizationType} />
            </div>
        </section>
    );
};

export { LoginPage };
