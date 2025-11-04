import Logo from "./ui/logo";
import Menu from "./ui/menu";
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