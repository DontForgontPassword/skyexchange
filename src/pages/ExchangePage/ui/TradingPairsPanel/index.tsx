import { useServerContext } from "@/shared/contexts/ServerContext";
import TradingPairButton from "../TradingPairButton";

const TradingPairsPanel = () => {
     const { currentCoin, serverData, setCurrentCoin } = useServerContext();

     return (
          <div className="trading-pairs card">
               <h3 className="trading-pairs__subtitle subtitle">Trading Pairs</h3>
               <div className="trading-pairs__list">
                    {
                         serverData.map((data) => <TradingPairButton
                              key={data.name}
                              name={data.name}
                              price={data.price}
                              change={data.change}
                              isActive={currentCoin.name === data.name}
                              onClick={() => {
                                   setCurrentCoin(data);
                              }}
                         />)
                    }
               </div>
          </div>
     );
}

export default TradingPairsPanel;