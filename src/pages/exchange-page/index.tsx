import TradingPairsPanel from "./ui/TradingPairsPanel";
import TradingPanel from "./ui/TradingPanel";
import "./ExchangePage.scss"
import ChartPanel from "./ui/ChartPanel";
import { useExchangeStore } from "./model/useExchangeStore";

const ExchangePage = () => {
     const coin = useExchangeStore((s) => s.currentCoin);

     return (
          <section className="exchange-page">
               <div className="exchange-page__inner container">
                    <TradingPairsPanel />
                    <ChartPanel />
                    <TradingPanel />
               </div>
          </section>
     );
}

export default ExchangePage;  