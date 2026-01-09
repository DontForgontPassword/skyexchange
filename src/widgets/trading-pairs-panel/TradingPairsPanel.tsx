import { useExchangeStore } from '@/shared/store/useExchangeStore';
import { TradingPairButton } from '@/shared/ui/trading-pair-button';
import './TradingPairsPanel.scss';

const TradingPairsPanel = () => {
    const { coins, currentCoin, setCurrentCoin } = useExchangeStore((s) => s);

    return (
        <div className="trading-pairs">
            <div className="trading-pairs__inner">
                <h3 className="trading-pairs__subtitle subtitle">Trading Pairs</h3>
                <div className="trading-pairs__list">
                    {coins.map((data) => (
                        <TradingPairButton
                            key={data.name}
                            name={data.name}
                            price={data.price}
                            icon={data.icon}
                            change={data.change}
                            isActive={currentCoin.name === data.name}
                            onClick={() => setCurrentCoin(data)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export { TradingPairsPanel };
