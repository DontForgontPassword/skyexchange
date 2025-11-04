import TradingPairsPanel from "./ui/trading-pairs-panel";
import TradingPanel from "./ui/trading-panel";
import ChartPanel from "./ui/chart-panel";
import "./ExchangePage.scss"

const ExchangePage = () => {
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