import clsx from 'clsx'
import { ArrowRight, X } from 'lucide-react'
import { ICoin, useExchangeStore } from '@/shared/store/useExchangeStore'
import { FC, useCallback, useState } from 'react'
import { Button } from '@/shared/ui/button/Button'
import './AddFundsModal.scss'
import { useAddFunds } from '../model/useAddFunds'
import { useUser } from '@/shared/store/useUser'

interface AddFundsModalProps {
    setFundsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddFundsModal: FC<AddFundsModalProps> = ({
    setFundsModalOpen,
}) => {
    const { exchange } = useAddFunds()
    const user = useUser.getState()
    const openCoins = useExchangeStore((s) => s.coins)

    const [selectedCoin, setSelectedCoin] = useState<ICoin>(() => openCoins[0])

    const [exchangeAmount, setExchangeAmount] = useState<number>(0)

    const handleExchange = useCallback(() => {
        exchange(selectedCoin, exchangeAmount)
    }, [selectedCoin, exchangeAmount])

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

                <div className="add-funds-modal__exchange-form">
                    <div className="add-funds-modal__exchange-group">
                        <p className="add-funds-modal__exchange-label">
                            Select Cryptocurrency
                        </p>
                        <div className="add-funds-modal__exchange-grid">
                            {openCoins
                                .filter((coin) => coin.name !== 'SMG')
                                .map((coin) => (
                                    <Button
                                        key={coin.name}
                                        type="button"
                                        onClick={() => setSelectedCoin(coin)}
                                        className={clsx(
                                            'add-funds-modal__exchange-button',
                                            selectedCoin?.name === coin.name &&
                                                'add-funds-modal__exchange-button--active',
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
                                                {coin.fullName}
                                            </p>
                                            <p className="primary-text">
                                                {`1 ${coin.name} = ${coin.rate} SMG`}
                                            </p>
                                        </div>
                                    </Button>
                                ))}
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
                                {`Balance: ${
                                    user.balances[
                                        selectedCoin.name.toLowerCase() as keyof typeof user.balances
                                    ].value
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
                                    exchangeAmount === 0 ? '' : exchangeAmount
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
                                    {exchangeAmount} {selectedCoin.fullName}
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
                        onClick={handleExchange}
                        disabled={!selectedCoin || exchangeAmount <= 0}
                        size={'lg'}
                        type="button"
                    >
                        Exchange to SMARAGD
                    </Button>
                </div>
            </div>
        </div>
    )
}
