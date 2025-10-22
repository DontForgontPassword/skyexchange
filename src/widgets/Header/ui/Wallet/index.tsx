import { Wallet as WalletIcon } from "lucide-react";
import "./Wallet.scss";

const Wallet = () => {
     return (
          <div className="wallet">
               <WalletIcon />
               <div>
                    <p className="wallet__title">Balance</p>
                    <span className="wallet__balance">1245.67 SMG</span>
               </div>
          </div>
     );
}

export default Wallet;