import { useUserStore } from "@/entities/User/model/store";
import { Links } from "@/shared/constants/Menu";
import { WalletIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/shared/ui/Button";
import { clsx } from "clsx";
import { useAuthStore } from "@/entities/Auth";
import "./Header.scss";
import { getDefaultBalance } from "@/entities/User/model/selectors";

const Header = () => {
    const user = useUserStore();
    const defaultBalance = getDefaultBalance(user);
    const auth = useAuthStore((s) => s);

    return (
        <header className="header">
            <div className="header__inner container">
                <NavLink to={"/"}>
                    <img src="/logo.png" width={150} height={80} />
                </NavLink>
                <nav className="header__nav nav">
                    <ul className="nav__list">
                        {Links.map((link, index) => (
                            <li
                                className="nav__item"
                                key={`${link.to}-${index}`}
                            >
                                <NavLink
                                    className={({ isActive }) =>
                                        clsx(
                                            "nav__link",
                                            isActive && "nav__link--active"
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
                                        {user.defaultCurrency} SMG
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
