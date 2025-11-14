import TradingPairButton from "@/features/trading-pair-button/TradingPairButton";
import { useExchangeStore } from "../../shared/store/useExchangeStore";

const TradingPairsPanel = () => {
     const coins = useExchangeStore((s) => s.coins);
     const coin = useExchangeStore((s) => s.currentCoin);
     const setCurrentCoin = useExchangeStore((s) => s.setCurrentCoin);

     return (
          <div className="trading-pairs">
               <div className="trading-pairs__wrapper card">
                    <h3 className="trading-pairs__subtitle subtitle">Trading Pairs</h3>
                    <div className="trading-pairs__list">
                         {
                              coins.map((data) => <TradingPairButton
                                   key={data.name}
                                   name={data.name}
                                   price={data.price}
                                   icon={data.icon}
                                   change={data.change}
                                   isActive={coin.name === data.name}
                                   onClick={() => {
                                        setCurrentCoin(data);
                                   }}
                              />)
                         }
                    </div>
               </div>
          </div>
     );
}

export default TradingPairsPanel;