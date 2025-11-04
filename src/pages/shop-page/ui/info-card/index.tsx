import clsx from "clsx";
import { Wallet } from "lucide-react";
import { FC } from "react";
import "./InfoCard.scss";
import { useUser } from "@/store/useUser";

interface InfoCardProps {
     className?: string;
     setFundsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfoCard: FC<InfoCardProps> = ({ setFundsModalOpen, className }) => {
     const coin = useUser((s) => s.currency);

     return (
          <div className={clsx("info-card", "card", className)}>
               <div className="info-card__header">
                    <div className="info-card__wallet-icon">
                         <Wallet className="info-card__icon" width={24} height={24} />
                    </div>
                    <div className="info-card__title">
                         <h3 className="info-card__wallet-title">Your Wallet</h3>
                         <p className="info-card__wallet-status">Connected</p>
                    </div>
               </div>
               <div className="info-card__wallet-stats">
                    <div className="info-card__wallet-box wallet-box">
                         <p className="wallet-box__title primary-text">Balance</p>
                         <div className="wallet-box__content">
                              <span className="wallet-box__stat-value wallet-box__balance">{coin.balance}</span>
                              <p className="primary-text">{coin.id} Coins</p>
                         </div>
                    </div>
                    <div className="info-card__wallet-box wallet-box">
                         <p className="wallet-box__title primary-text">Owned NFTs</p>
                         <div className="wallet-box__content">
                              <span className="wallet-box__stat-value">0</span>
                         </div>
                    </div>
                    <div className="info-card__wallet-box wallet-box">
                         <p className="wallet-box__title primary-text">Total Value</p>
                         <div className="wallet-box__content">
                              <span className="wallet-box__stat-value">0.00 SMARAGD</span>
                              <span className="primary-text">$0.00</span>
                         </div>
                    </div>
               </div>
               <button className="info-card__button" onClick={() => setFundsModalOpen(true)}>Add Funds</button>
          </div>
     );
}

export default InfoCard;