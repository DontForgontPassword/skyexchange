import { Links } from "@/shared/constants";
import { NavLink } from "react-router-dom";
import Wallet from "../Wallet";
import "./Menu.scss";

const Menu = () => {
     return (
          <nav className="nav">
               <ul className="nav__list">
                    {
                         Links.map((link) =>
                              <li className="nav__item" key={link.to}>
                                   <NavLink className="nav__link" to={link.to}>{link.text}</NavLink>
                              </li>
                         )
                    }
                    <Wallet />
               </ul>
          </nav>
     );
}

export default Menu;