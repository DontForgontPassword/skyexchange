import { ArrowRight, X } from "lucide-react";
import "./AddFundsModal.scss";
import { ICoin, useExchangeStore } from "@/shared/store/useExchangeStore";
import { FC, useMemo, useState } from "react";
import clsx from "clsx";
import { useUser } from "@/shared/store/useUser";
import { toast } from "sonner";
import Button from "@/shared/ui/button/Button";

interface AddFundsModalProps {
     setFundsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddFundsModal: FC<AddFundsModalProps> = ({ setFundsModalOpen }) => {
     const availableCoins = useExchangeStore((s) => s.coins);
     const addBalance = useUser((s) => s.addBalance);
     const user = useUser.getState();

     const [selectedCoin, setSelectedCoin] = useState<ICoin | undefined>(() =>
          availableCoins.find((c) => c.name !== "SMG")
     );

     const [exchangeAmount, setExchangeAmount] = useState<number>(0);

     const ensuredSelectedCoin = useMemo(() => {
          if (selectedCoin) return selectedCoin;
          return availableCoins.find((c) => c.name !== "SMG");
     }, [availableCoins, selectedCoin]);

     const onExchange = (e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          const coin = ensuredSelectedCoin;
          if (!coin) return toast.error("Please select a cryptocurrency.");

          const amount = Number(exchangeAmount);
          if (!amount || amount <= 0 || Number.isNaN(amount)) {
               toast.error("Please enter a valid amount to exchange.");
               return;
          }

          if (user.balance.amount < amount) {
               toast.error(
                    `Insufficient funds: you have ${user.balance} SMG.`
               );
               return;
          }

          const smgAmount = coin.rate * amount;

          addBalance(smgAmount);

          toast.success(
               `Successfully exchanged ${amount} ${coin.fullName} → ${smgAmount} SMARAGD.`
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
                              <p className="add-funds-modal__subtitle primary-text">
                                   Exchange cryptocurrency to SMARAGD
                              </p>
                         </div>
                         <button
                              className="add-funds-modal__header-close-button"
                              onClick={() => setFundsModalOpen(false)}
                              aria-label="Close"
                              type="button"
                         >
                              <X color="white" width={24} height={24} />
                         </button>
                    </div>

                    <form
                         className="add-funds-modal__exchange-form"
                         onSubmit={(e) => e.preventDefault()}
                    >
                         <div className="add-funds-modal__exchange-group">
                              <p>Select Cryptocurrency</p>
                              <div className="add-funds-modal__exchange-grid">
                                   {availableCoins
                                        .filter((coin) => coin.name !== "SMG")
                                        .map((coin) => (
                                             <Button
                                                  key={coin.name}
                                                  type="button"
                                                  onClick={() => setSelectedCoin(coin)}
                                                  className={clsx(
                                                       "add-funds-modal__exchange-button",
                                                       ensuredSelectedCoin?.name === coin.name &&
                                                       "add-funds-modal__exchange-button--active"
                                                  )}
                                             >
                                                  <div className="add-funds-modal__exchange-button-icon">
                                                       <img src={coin.icon} alt={coin.name} width={24} height={24} />
                                                  </div>
                                                  <div className="add-funds-modal__crypto-info">
                                                       <p className="add-funds-modal__crypto-name">{coin.fullName}</p>
                                                       <p className="primary-text">
                                                            1 {coin.name} = {coin.rate} SMG
                                                       </p>
                                                  </div>
                                             </Button>
                                        ))}
                              </div>
                         </div>

                         {ensuredSelectedCoin && (
                              <div className="add-funds-modal__exchange-group">
                                   <div>
                                        <label className="add-funds-modal__label" htmlFor="amount-input">
                                             Amount to Exchange
                                        </label>
                                        <p className="add-funds-modal__balance-info primary-text">
                                             Balance:
                                             {"SMG" === ensuredSelectedCoin.name
                                                  ? user.balance.id
                                                  : 0} 
                                             {ensuredSelectedCoin.name}
                                        </p>
                                   </div>
                                   <div className="add-funds-modal__input-wrapper">
                                        <input
                                             placeholder="0.00"
                                             onChange={(e) => setExchangeAmount(Number(e.target.value))}
                                             type="number"
                                             id="amount-input"
                                             value={exchangeAmount === 0 ? "" : exchangeAmount}
                                             className="add-funds-modal__input"
                                             min={0}
                                             step="any"
                                        />
                                        <p className="add-funds-modal__exchange-coin-name">
                                             {ensuredSelectedCoin.name}
                                        </p>
                                   </div>
                              </div>
                         )}

                         {ensuredSelectedCoin && exchangeAmount > 0 && (
                              <div className="add-funds-modal__exchange-info">
                                   <div className="add-funds-modal__exchange-info-preview">
                                        <span className="add-funds-modal__exchange-price">
                                             {exchangeAmount} {ensuredSelectedCoin.fullName}
                                        </span>
                                        <ArrowRight />
                                        <span className="add-funds-modal__exchange-price">
                                             {ensuredSelectedCoin.rate * exchangeAmount} SMARAGD
                                        </span>
                                   </div>
                                   <p className="add-funds-modal__exchange-subinfo primary-text">
                                        Exchange Rate: 1 {ensuredSelectedCoin.name} = {ensuredSelectedCoin.rate} SMARAGD
                                   </p>
                              </div>
                         )}

                         <button
                              className="add-funds-modal__exchange-submit"
                              onClick={onExchange}
                              disabled={!ensuredSelectedCoin || exchangeAmount <= 0}
                              type="button"
                         >
                              Exchange to SMARAGD
                         </button>
                    </form>
               </div>
          </div>
     );
};

export default AddFundsModal;
