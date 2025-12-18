import { useUser } from '@/shared/store/useUser';
import { Links } from '@/shared/constants/Menu';
import { WalletIcon } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/shared/ui/button';
import clsx from 'clsx';
import './Header.scss';

const Header = () => {
    const user = useUser.getState();
    const defaultBalance = user.getDefaultBalance();
    useEffect(() => {
        console.log(`User token is ${user.token}`);
    });

    return (
        <header className="header">
            <div className="header__inner container">
                <div className="header__logo logo">
                    <img />
                    <div className="logo__wrapper">
                        <h1 className="logo__title">SKY</h1>
                        <p className="logo__subtitle">EXCHANGE</p>
                    </div>
                </div>
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
                                            'nav__link',
                                            isActive && 'nav__link--active',
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
                            <Button asChild variant="default">
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
