import { useExchangeStore } from "../../../../store/useExchangeStore";
import TradingPairButton from "../trading-pair-button";

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