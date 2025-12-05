import TradingPairsPanel from "../TradingPairsPanel/TradingPairsPanel";
import ChartPanel from "../ChartPanel/ChartPanel";
import TradingPanel from "@/features/trading-panel/TradingPanel";
import "./ExchangePage.scss"

export const ExchangePage = () => {
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