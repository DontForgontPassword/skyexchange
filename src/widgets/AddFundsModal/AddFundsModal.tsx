import { ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { useMe } from "@/entities/user";
import { useAuthStore } from "@/features/auth";
import "./AddFundsModal.scss";
import { ICoin } from "@/entities/Exchange";

interface AddFundsModalProps {
    setFundsModalOpen: (open: boolean) => void;
}

const AddFundsModal = ({ setFundsModalOpen }: AddFundsModalProps) => {
    const [exchangeAmount, setExchangeAmount] = useState<number>(0);
    const accessToken = useAuthStore((s) => s.accessToken);
    const isAuthorized = !!accessToken;

    const user = useMe().data;

    //!todo get coins from store
    // const coins = Object.values(exchangeStore.coins);

    const handleModalClose = () => {
        setFundsModalOpen(false);
    };

    const selectedCoin = useState<ICoin>({
        name: "Bitcoin",
        icon: "/assets/coins/btc.png",
        rate: 50000,
        change: 5,
        id: "btc",
        pair: "BTC/SMG",
        price: 50000,
        symbol: "BTC",
    });

    return (
        <div className="add-funds-modal">
            <div className="add-funds-modal__content">
                <div className="add-funds-modal__header">
                    <div className="add-funds-modal__header-wrapper">
                        <h3 className="add-funds-modal__title">Add Funds</h3>
                        <p className="add-funds-modal__subtitle primary-text">
                            Exchange cryptocurrency to SMARAGD
                        </p>
                    </div>
                    <button
                        className="add-funds-modal__header-close-button"
                        onClick={handleModalClose}
                        aria-label="Close"
                        type="button"
                    >
                        <X color="white" width={24} height={24} />
                    </button>
                </div>

                <div className="add-funds-modal__exchange-form">
                    <div className="add-funds-modal__exchange-group">
                        <p className="add-funds-modal__exchange-label">
                            Select Cryptocurrency
                        </p>
                        <div className="add-funds-modal__exchange-grid">
                            {/* !todo map coins from store */}
                            {/* {coins
                                .filter((coin) => coin.name !== "SMG")
                                .map((coin) => (
                                    <Button
                                        key={coin.name}
                                        type="button"
                                        onClick={() => setSelectedCoin(coin)}
                                        className={clsx(
                                            "add-funds-modal__exchange-button",
                                            selectedCoin?.name === coin.name &&
                                                "add-funds-modal__exchange-button--active",
                                        )}
                                    >
                                        <div className="add-funds-modal__exchange-button-icon">
                                            <img
                                                src={coin.icon}
                                                alt={coin.name}
                                                width={24}
                                                height={24}
                                            />
                                        </div>
                                        <div className="add-funds-modal__crypto-info">
                                            <p className="add-funds-modal__crypto-name">
                                                {coin.name}
                                            </p>
                                            <p className="primary-text">
                                                {`1 ${coin.name} = ${coin.rate} SMG`}
                                            </p>
                                        </div>
                                    </Button>
                                ))} */}
                        </div>
                    </div>

                    <div className="add-funds-modal__exchange-group">
                        <div>
                            <label
                                className="add-funds-modal__label"
                                htmlFor="amount-input"
                            >
                                Amount to Exchange
                            </label>
                            <p className="add-funds-modal__balance-info primary-text">
                                {isAuthorized &&
                                    `Balance: ${
                                        user?.balances
                                    } ${selectedCoin.name}`}
                            </p>
                        </div>
                        <div className="add-funds-modal__input-wrapper">
                            <input
                                placeholder="0.00"
                                onChange={(e) =>
                                    setExchangeAmount(Number(e.target.value))
                                }
                                type="number"
                                id="amount-input"
                                value={
                                    exchangeAmount === 0 ? "" : exchangeAmount
                                }
                                className="add-funds-modal__input"
                                min={0}
                                step="any"
                            />
                            <p className="add-funds-modal__exchange-coin-name">
                                {selectedCoin.name}
                            </p>
                        </div>
                    </div>

                    {selectedCoin && exchangeAmount > 0 && (
                        <div className="add-funds-modal__exchange-info">
                            <div className="add-funds-modal__exchange-info-preview">
                                <span className="add-funds-modal__exchange-price">
                                    {exchangeAmount} {selectedCoin.name}
                                </span>
                                <ArrowRight />
                                <span className="add-funds-modal__exchange-price">
                                    {selectedCoin.rate * exchangeAmount} SMARAGD
                                </span>
                            </div>
                            <p className="add-funds-modal__exchange-subinfo primary-text">
                                {`Exchange Rate: 1 ${selectedCoin.name} = ${selectedCoin.rate} SMARAGD`}
                            </p>
                        </div>
                    )}

                    <Button
                        className="add-funds-modal__exchange-submit"
                        onClick={() => {}}
                        disabled={!selectedCoin || exchangeAmount <= 0}
                        size={"lg"}
                        type="button"
                    >
                        Exchange to SMARAGD
                    </Button>
                </div>
            </div>
        </div>
    );
};

export { AddFundsModal };
