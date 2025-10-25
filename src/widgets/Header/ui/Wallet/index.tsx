import { Wallet as WalletIcon } from "lucide-react";
import "./Wallet.scss";
import { useUser } from "@/store/useUser";

const Wallet = () => {
     const balance = useUser((s) => s.currency.balance);

     return (
          <div className="wallet">
               <WalletIcon />
               <div>
                    <p className="wallet__title">Balance</p>
                    <span className="wallet__balance">{balance} SMG</span>
               </div>
          </div>
     );
}

export default Wallet;