import { ArrowRight, Bitcoin, X } from "lucide-react";
import "./AddFundsModal.scss";
import { ICoin, useExchangeStore } from "@/store/useExchangeStore";
import { FC, useState } from "react";
import clsx from "clsx";
import { useUser } from "@/store/useUser";
import { toast } from "sonner";

interface AddFundsModalProps {
     setFundsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddFundsModal: FC<AddFundsModalProps> = ({ setFundsModalOpen }) => {
     const availableCoins = useExchangeStore((s) => s.coins); /* getting available coins from exchange store */
     const [exchangeCoin, setExchangeCoin] = useState<ICoin>(availableCoins[0]);
     const [exchangeAmount, setExchangeAmount] = useState(0);
     const userCurrency = useUser((s) => s.currency);
     const addBalance = useUser((s) => s.addBalance);

     const onExchange = (e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();

          const amount = Number(exchangeAmount);
          if (!amount || amount <= 0) {
               toast.error("Please enter the correct exchange amount");
               return;
          }

          if (userCurrency.id !== exchangeCoin.name) {
               toast.error(`You don't have ${exchangeCoin.name}.`);
               return;
          }

          if (userCurrency.balance < amount) {
               toast.error(`Insufficient funds: you have ${userCurrency.balance} ${userCurrency.id}.`);
               return;
          }

          const smgAmount = exchangeCoin.rate! * amount;

          addBalance(exchangeCoin.name, -amount);
          addBalance("SMG", smgAmount);

          toast.success(
               `Exchanged ${amount} ${exchangeCoin.fullName} → ${smgAmount} SMARAGD`
          );

          setExchangeAmount(0);
          setFundsModalOpen(false);
     };

     return (
          <div className="add-funds-modal">
               <div className="add-funds-modal__content card">
                    <div className="add-funds-modal__header">
                         <div className="add-funds-modal__header-wrapper">
                              <h3 className="add-funds-modal__title">Add Funds</h3>
                              <p className="add-funds-modal__subtitle primary-text">Exchange crypto to SMARAGD Coins</p>
                         </div>
                         <button className="add-funds-modal__header-close-button" onClick={() => setFundsModalOpen(false)}>
                              <X width={24} height={24} />
                         </button>
                    </div>

                    <form className="add-funds-modal__exchange-form" onSubmit={(e) => e.preventDefault()}>
                         <div className="add-funds-modal__exchange-group">
                              <p>Select Cryptocurrency</p>
                              <div className="add-funds-modal__exchange-grid">
                                   {
                                        availableCoins.map((coin) => {
                                             return coin.name !== "SMG" && (
                                                  <button
                                                       key={coin.name}
                                                       type="button"
                                                       onClick={() => setExchangeCoin(coin)}
                                                       className={clsx(
                                                            "add-funds-modal__exchange-button",
                                                            exchangeCoin === coin && "add-funds-modal__exchange-button--active"
                                                       )}
                                                  >
                                                       <div className="add-funds-modal__exchange-button-icon">
                                                            <Bitcoin />
                                                       </div>
                                                       <div className="add-funds-modal__crypto-info">
                                                            <p className="add-funds-modal__crypto-name">{coin.fullName}</p>
                                                            <p className="primary-text">1 {coin.fullName} = {coin.rate} SMARAGD</p>
                                                       </div>
                                                  </button>
                                             );
                                        })
                                   }
                              </div>
                         </div>

                         <div className="add-funds-modal__exchange-group">
                              <div>
                                   <label className="add-funds-modal__label" htmlFor="amount-input">Amount to Exchange</label>
                                   <p className="add-funds-modal__balance-info primary-text">
                                        Balance: {userCurrency.id === exchangeCoin.name ? userCurrency.balance : 0} {exchangeCoin.name}
                                   </p>
                              </div>
                              <div className="add-funds-modal__input-wrapper">
                                   <input
                                        placeholder="0.00"
                                        onChange={(e) => setExchangeAmount(Number(e.target.value))}
                                        type="number"
                                        id="amount-input"
                                        className="add-funds-modal__input"
                                   />
                                   <p className="add-funds-modal__exchange-coin-name">{exchangeCoin.name}</p>
                              </div>
                         </div>

                         {exchangeAmount > 0 && (
                              <div className="add-funds-modal__exchange-info">
                                   <div className="add-funds-modal__exchange-info-preview">
                                        <span className="add-funds-modal__exchange-price">
                                             {exchangeAmount} {exchangeCoin.fullName}
                                        </span>
                                        <ArrowRight />
                                        <span className="add-funds-modal__exchange-price">
                                             {exchangeCoin.rate! * exchangeAmount} SMARAGD
                                        </span>
                                   </div>
                                   <p className="add-funds-modal__exchange-subinfo primary-text">
                                        Exchange Rate: {exchangeAmount} {exchangeCoin.fullName} = {exchangeCoin.rate! * exchangeAmount} Smaragd
                                   </p>
                              </div>
                         )}

                         <button
                              className="add-funds-modal__exchange-submit"
                              onClick={onExchange}
                              disabled={exchangeAmount <= 0}
                         >
                              Exchange to SMARAGD
                         </button>
                    </form>
               </div>
          </div>
     );
};

export default AddFundsModal;
