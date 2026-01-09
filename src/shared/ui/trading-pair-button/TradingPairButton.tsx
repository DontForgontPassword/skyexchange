import './TradingPairButton.scss'
import {clsx} from 'clsx'
import { formatPrice } from '@/shared/utils/format'

interface TradingPairsPanelProps {
     name: string;
     price: number;
     change: number;
     isActive: boolean;
     icon: string;
     onClick: () => void;
}

export const TradingPairButton = ({ name, price, change, icon, isActive, onClick }: TradingPairsPanelProps) => {
     return (
          <button className={clsx('trading-pair', isActive && 'trading-pair--active')} onClick={onClick}>
               <div className="trading-pair__header">
                    <img width={24} height={24} src={icon} alt="Sky Exchange" />
                    <p className="trading-pair__pair-name">{name}</p>
               </div>
               <div className="trading-pair__bottom">
                    <p className="trading-pair__price">
                         ${
                              formatPrice(price)
                         }
                    </p>
                    <p className={clsx('trading-pair__change', change >= 0 ? 'trading-pair__change--positive' : 'trading-pair__change--negative')}>
                         {
                              change > 0 ? `+${change}%` : `${change}%`
                         }
                    </p>
               </div>
          </button >
     )
}