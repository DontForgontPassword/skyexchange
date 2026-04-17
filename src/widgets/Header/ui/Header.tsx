import { LINKS } from "@/shared/config";
import { WalletIcon } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/shared/ui/Button";
import { clsx } from "clsx";
import { useGetBalanceQuery } from "@/entities/user";
import { useAppSelector } from "@/app/provider";
import "./Header.scss";

const Header = () => {
    const isAuthorized = useAppSelector((state) => state.auth.isAuthenticated);
    const { data: balance, isLoading: isBalanceLoading } = useGetBalanceQuery(
        undefined,
        {
            skip: !isAuthorized,
        },
    );
    return (
        <header className="header">
            <div className="header__inner container">
                <NavLink to={"/"}>
                    <img src="/logo.png" width={150} height={80} />
                </NavLink>
                <nav className="header__nav nav">
                    <ul className="nav__list">
                        {LINKS.map(
                            (link, index) =>
                                (!link.authRequired || isAuthorized) && (
                                    <li
                                        className="nav__item"
                                        key={`${link.to}-${index}`}
                                    >
                                        <NavLink
                                            className={({ isActive }) =>
                                                clsx(
                                                    "nav__link",
                                                    isActive &&
                                                    "nav__link--active",
                                                )
                                            }
                                            to={link.to}
                                        >
                                            {link.text}
                                        </NavLink>
                                    </li>
                                ),
                        )}
                        {isAuthorized ? (
                            <div className="wallet">
                                <WalletIcon />
                                <div>
                                    <p className="wallet__title">Balance</p>
                                    <span className="wallet__balance">
                                        {`${balance?.amount.toFixed(2)} SMG`}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <Link to="/auth"><Button variant="default">
                                Login
                            </Button>
                            </Link>
                        )}
                    </ul>
                </nav>
            </div>
        </header >
    );
};

export { Header };
