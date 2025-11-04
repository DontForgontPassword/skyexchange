import { Links } from "@/shared/constants";
import { NavLink } from "react-router-dom";
import Wallet from "../wallet";
import "./Menu.scss";
import clsx from "clsx";

const Menu = () => {
     return (
          <nav className="nav">
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
                    <Wallet />
               </ul>
          </nav>
     );
}

export default Menu;