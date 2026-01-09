import { ChartPanel } from '@/widgets/chart-panel'
import { TradingPairsPanel } from '@/widgets/trading-pairs-panel'
import { TradingPanel } from '@/widgets/trading-panel'
import './ExchangePage.scss'
import { useExchangeStore } from '@/shared/store/useExchangeStore'
import { useEffect } from 'react'

export const ExchangePage = () => {
     const update = useExchangeStore((s) => s.update);

     useEffect(() => {
          update();
      
          const interval = setInterval(() => {
              update();
          }, 2000);
      
          return () => clearInterval(interval);
      }, [update]);
      

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