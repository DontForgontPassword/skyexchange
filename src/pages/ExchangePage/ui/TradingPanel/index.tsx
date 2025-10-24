import Filter from "@/components/Filter";
import "./TradingPanel.scss"
import { useEffect, useState } from "react";
import { TRADE_FILTER_OPTIONS } from "@/shared/constants/Chart.constants";
import { filterType } from "@/shared/types";
import Input from "@/components/Input";
import { useServerContext } from "@/shared/contexts/ServerContext";
import { toast } from "sonner";
import { firstUpper } from "@/shared/utils/string";

const TradingPanel = () => {
     const { server, user } = useServerContext();
     const currentPrice = server.currentCoin.price;
     const [buyPrice, setBuyPrice] = useState(currentPrice);
     const [buyAmount, setBuyAmount] = useState(0)
     const [actionType, setActionType] = useState<filterType>("sell")

     useEffect(() => {
          setBuyPrice(currentPrice);
     }, [currentPrice]);

     const handleBuy = (e) => {
          const total = buyPrice * buyAmount;

          if (total > user.currency) {
               toast.error("Insufficient USDT balance");
               return;
          }
     }

     return (
          <div className="trading-panel">
               <div className="trading-panel__wrapper card">
                    <Filter className="trading-panel__filter" filters={TRADE_FILTER_OPTIONS} filterType={actionType} setFilterType={setActionType} />
                    <form onSubmit={(e) => e.preventDefault()} className="trading-panel__form" action="post">
                         <div className="trading-panel__form-block">
                              <label className="trading-panel__form-label" htmlFor="amount-input">
                                   Amount
                              </label>
                              <Input onChange={(e) => setBuyAmount(Number(e.target.value))} className="trading-panel__form-input" id="amount-input" type="number" />
                         </div>
                         <div className="trading-panel__form-block">
                              <label className="trading-panel__form-label" htmlFor="price-input">
                                   Price (USDT)
                              </label>
                              <Input onChange={(e) => setBuyPrice(Number(e.target.value))} className="trading-panel__form-input" value={buyPrice} id="price-input" type="number" />
                         </div>
                         <div className="trading-panel__form-block">
                              <label className="trading-panel__form-label" htmlFor="total-input">
                                   Total (USDT)
                              </label>
                              <Input className="trading-panel__form-input" id="amount-input" type="number" />
                         </div>
                         <button type="submit" onClick={handleBuy} className="trading-panel__submit-button">Buy {firstUpper(server.currentCoin.type)}</button>
                    </form>
                    <div className="trading-panel__info">
                         <div className="trading-panel__info-row">
                              <p className="trading-panel__info-label">Available USDT:</p>
                              <span className="trading-panel__info-value">{buyPrice.toFixed(2)}</span>
                         </div>
                         <div className="trading-panel__info-row">
                              <p className="trading-panel__info-label">Fee (0.1%):</p>
                              <span className="trading-panel__info-value">0 USDT</span>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default TradingPanel;