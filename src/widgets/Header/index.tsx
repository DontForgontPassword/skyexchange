import "./Header.scss"
import clsx from "clsx";
import { useUser } from "@/shared/store/useUser";
import { Links } from "@/shared/constants/Menu.constants";
import { WalletIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

const Header = () => {
     const balance = useUser((s) => s.balance);

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
                              {
                                   Links.map((link, index) =>
                                        <li className="nav__item" key={`${link.to}-${index}`}>
                                             <NavLink className={(
                                                  { isActive }
                                             ) => clsx("nav__link", isActive && "nav__link--active")} to={link.to}>{link.text}</NavLink>
                                        </li>
                                   )
                              }
                              <div className="wallet">
                                   <WalletIcon />
                                   <div>
                                        <p className="wallet__title">Balance</p>
                                        <span className="wallet__balance">{balance} SMG</span>
                                   </div>
                              </div>
                         </ul>
                    </nav>
               </div>
          </header>
     );
}

export default Header;   