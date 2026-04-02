import { LINKS } from "@/shared/config";
import { WalletIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/shared/ui/Button";
import { clsx } from "clsx";
import { useAuthStore } from "@/features/auth";
import "./Header.scss";
import { useBalance } from "@/entities/user";

const Header = () => {
    const auth = useAuthStore((s) => s);
    const balance = useBalance("smg").data;

    return (
        <header className="header">
            <div className="header__inner container">
                <NavLink to={"/"}>
                    <img src="/logo.png" width={150} height={80} />
                </NavLink>
                <nav className="header__nav nav">
                    <ul className="nav__list">
                        {LINKS.map((link, index) => (
                            <li
                                className="nav__item"
                                key={`${link.to}-${index}`}
                            >
                                <NavLink
                                    className={({ isActive }) =>
                                        clsx(
                                            "nav__link",
                                            isActive && "nav__link--active",
                                        )
                                    }
                                    to={link.to}
                                >
                                    {link.text}
                                </NavLink>
                            </li>
                        ))}
                        {auth.accessToken !== null ? (
                            <div className="wallet">
                                <WalletIcon />
                                <div>
                                    <p className="wallet__title">Balance</p>
                                    <span className="wallet__balance">
                                        {balance?.amount} SMG
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <Button variant="default">
                                <Link to="/login">Login</Link>
                            </Button>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export { Header };
