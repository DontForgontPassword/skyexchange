import TradingPairsPanel from "./ui/TradingPairsPanel";
import TradingPanel from "./ui/TradingPanel";
import "./ExchangePage.scss"
import { useServerContext } from "@/shared/contexts/ServerContext";
import ChartPanel from "./ui/ChartPanel";

const ExchangePage = () => {
     const { server } = useServerContext();
     const currentCoin = server.currentCoin;

     return (
          <section className="exchange">
               <div className="exchange__inner container">
                    <TradingPairsPanel />
                    <ChartPanel name={currentCoin.name} price={currentCoin.price} change={currentCoin.change} />
                    <TradingPanel />
               </div>
          </section>
     );
}

export default ExchangePage;  