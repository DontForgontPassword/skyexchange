import { useExchangeStore } from "@/entities/Exchange";
import { TradingPairButton } from "@/shared/ui/TradingPairButton";
import { Card } from "@/shared/ui/Card";
import "./TradingPairsPanel.scss";

const TradingPairsPanel = () => {
    const coins = useExchangeStore((s) => s.coins);
    const currentCoinId = useExchangeStore((s) => s.currentCoinId);
    const setCurrentCoin = useExchangeStore((s) => s.setCurrentCoin);

    return (
        <Card className="trading-pairs-panel-panel">
            <h3 className="trading-pairs-panel__subtitle subtitle">
                Trading Pairs
            </h3>
            <div className="trading-pairs-panel__list">
                {Object.values(coins).map((coin) => (
                    <TradingPairButton
                        key={coin.name}
                        name={coin.symbol}
                        price={coin.price}
                        icon={coin.icon}
                        change={coin.change}
                        isActive={coin.id === currentCoinId}
                        onClick={() => setCurrentCoin(coin.id)}
                    />
                ))}
            </div>
        </Card>
    );
};

export { TradingPairsPanel };
