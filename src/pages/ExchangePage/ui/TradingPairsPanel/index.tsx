import { useServerContext } from "@/shared/contexts/ServerContext";
import TradingPairButton from "../TradingPairButton";

const TradingPairsPanel = () => {
     const { server } = useServerContext();
     const serverData = server.serverData;
     const currentCoin = server.currentCoin;

     return (
          <div className="trading-pairs">
               <div className="trading-pairs__wrapper card">
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
                                        server.setCurrentCoin(data);
                                   }}
                              />)
                         }
                    </div>
               </div>
          </div>
     );
}

export default TradingPairsPanel;