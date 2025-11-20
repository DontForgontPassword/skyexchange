import clsx from "clsx";
import { Wallet } from "lucide-react";
import { FC } from "react";
import "./InfoCard.scss";
import { useUser } from "@/shared/store/useUser";
import Button from "@/shared/ui/button/Button";
import { useNavigate } from "react-router-dom";

interface InfoCardProps {
     className?: string;
     setFundsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfoCard: FC<InfoCardProps> = ({ setFundsModalOpen, className }) => {
     const navigate = useNavigate();
     const user = useUser();

     const userBalance = user.balance?.amount || 0;
     const isAuth = !!user.token;

     return (
          <div className={clsx("info-card", "card", className)}>
               <div className="info-card__header">
                    <div className="info-card__wallet-icon">
                         <Wallet className="info-card__icon" width={24} height={24} />
                    </div>
                    <div className="info-card__title">
                         <h3 className="info-card__wallet-title">
                              {isAuth ? "Your Wallet" : "Wallet Access"}
                         </h3>
                         <p className="info-card__wallet-status">
                              {isAuth ? "Connected" : "Not Connected"}
                         </p>
                    </div>
               </div>

               {!isAuth ? (
                    <div className="info-card__not-auth">
                         <div className="info-card__not-auth-box">
                              <p className="info-card__not-auth-title">You are not logged in</p>
                              <p className="info-card__not-auth-subtitle">
                                   Sign in to access your wallet, balance and NFTs.
                              </p>
                              <Button
                                   className="info-card__button info-card__login-button"
                                   variant="primary"
                                   onClick={() => navigate("/login")}
                              >
                                   Login
                              </Button>
                         </div>
                    </div>
               ) : (
                    <>
                         <div className="info-card__wallet-stats">
                              <div className="info-card__wallet-box wallet-box">
                                   <p className="wallet-box__title primary-text">Balance</p>
                                   <div className="wallet-box__content">
                                        <span className="wallet-box__stat-value wallet-box__balance">
                                             {userBalance.toFixed(2)}
                                        </span>
                                        <p className="primary-text">SMG Coins</p>
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

                         <Button
                              className="info-card__button"
                              onClick={() => setFundsModalOpen(true)}
                         >
                              Add Funds
                         </Button>
                    </>
               )}
          </div>
     );
};

export default InfoCard;
