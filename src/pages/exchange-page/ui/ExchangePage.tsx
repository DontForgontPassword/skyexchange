import { ChartPanel } from '@/widgets/chart-panel'
import { TradingPairsPanel } from '@/widgets/trading-pairs-panel'
import { TradingPanel } from '@/widgets/trading-panel'
import './ExchangePage.scss'

export const ExchangePage = () => {
     return (
          <section className="exchange-page">
               <div className="exchange-page__inner container">
                    <TradingPairsPanel />
                    <ChartPanel />
                    <TradingPanel />
               </div>
          </section>
     )
}