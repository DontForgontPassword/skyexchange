import Filter from "@/components/Filter";
import "./TradingPanel.scss"
import { useState } from "react";
import { TRADE_FILTER_OPTIONS } from "@/shared/constants/Chart.constants";
import { filterType } from "@/shared/types";
import Input from "@/components/Input";

const TradingPanel = () => {
     const [actionType, setActionType] = useState<filterType>("sell")

     return (
          <div className="trading-panel card">
               <Filter className="trading-panel__filter" filters={TRADE_FILTER_OPTIONS} filterType={actionType} setFilterType={setActionType} />
               <form onSubmit={(e) => e.preventDefault()} className="trading-panel__form" action="post">
                    <div className="trading-panel__form-block">
                         <label className="trading-panel__form-label" htmlFor="amount-input">
                              Amount
                         </label>
                         <Input id="amount-input" type="number" />
                    </div>
                    <div className="trading-panel__form-block">
                         <label className="trading-panel__form-label" htmlFor="amount-input">
                              Price (USDT)
                         </label>
                         <Input id="amount-input" type="number" />
                    </div>
                    <div className="trading-panel__form-block">
                         <label className="trading-panel__form-label" htmlFor="amount-input">
                              Total (USDT)
                         </label>
                         <Input className="trading-panel__form-input" id="amount-input" type="number" />
                    </div>
                    <button type="submit" className="trading-panel__submit-button">Buy Ethereum</button>
               </form>
               <div className="trading-panel__info">
                    <div className="trading-panel__info-row">
                         <p className="trading-panel__info-label">Available USDT:</p>
                         <span className="trading-panel__info-value">500000.0</span>
                    </div>
                    <div className="trading-panel__info-row">
                         <p className="trading-panel__info-label">Fee (0.1%):</p>
                         <span className="trading-panel__info-value">0.00 USDT</span>
                    </div>
               </div>
          </div>
     );
}

export default TradingPanel;