import TradingPairsPanel from "../../../widgets/trading-pairs-panel/TradingPairsPanel";
import TradingPanel from "../../../widgets/trading-panel/TradingPanel";
import ChartPanel from "../../../widgets/chart-panel/ChartPanel";
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