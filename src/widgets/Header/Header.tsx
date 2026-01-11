import { useUserStore } from "@/entities/User/model/store";
import { Links } from "@/shared/constants/Menu";
import { WalletIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/shared/ui/Button";
import { clsx } from "clsx";
import "./Header.scss";

const Header = () => {
    const user = useUserStore((s) => s);
    const defaultBalance = user.getDefaultBalance();
    useEffect(() => {
        console.log(`User token is ${user.token}`);
    });

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
                        {user.token !== null ? (
                            <div className="wallet">
                                <WalletIcon />
                                <div>
                                    <p className="wallet__title">Balance</p>
                                    <span className="wallet__balance">
                                        {defaultBalance.value} SMG
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
