import Logo from "./ui/Logo";
import Menu from "./ui/Menu";
import "./Header.scss"

const Header = () => {
     return (
          <header className="header">
               <div className="header__inner container">
                    <Logo />
                    <Menu />
               </div>
          </header>
     );
}

export default Header;   