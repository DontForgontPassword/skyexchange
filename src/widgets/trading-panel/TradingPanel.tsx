import "./TradingPanel.scss";
import { act, useEffect, useState } from "react";
import { TRADE_FILTER_OPTIONS } from "@/shared/constants/Chart";
import { FilterType } from "@/shared/types";
import { toast } from "sonner";
import { firstUpper } from "@/shared/utils/string";
import { useExchangeStore } from "../../shared/store/useExchangeStore";
import { useUser } from "@/shared/store/useUser";
import clsx from "clsx";
import Input from "@/shared/ui/input/Input";
import Filter from "@/shared/ui/filter/Filter";
import Button from "@/shared/ui/button/Button";

const TradingPanel = () => {
     const coin = useExchangeStore((s) => s.currentCoin);
     const coinPrice = coin.price;
     const user = useUser();
     const [buyPrice, setBuyPrice] = useState(coinPrice);
     const [buyAmount, setBuyAmount] = useState(0);
     const [actionType, setActionType] = useState<FilterType>("sell");

     useEffect(() => {
          setBuyPrice(coinPrice);
     }, [coinPrice]);

     const handleBuy = () => {
          const total = buyPrice * buyAmount;

          if (total > user.balance.amount) {
               toast.error(`Insufficient balance`);
               return;
          }

          user.addBalance(total);
          toast.success(`${firstUpper(actionType)} order executed`);
     };

     return (
          <div className="trade-panel">
               <div className="trade-panel__body card">
                    <div className="trade-panel__header">
                         <Filter
                              filters={TRADE_FILTER_OPTIONS}
                              filterType={actionType}
                              setFilterType={setActionType}
                              defaultValue={"all"}
                         />
                    </div>

                    <form
                         onSubmit={(e) => e.preventDefault()}
                         className="trade-panel__order-form"
                         action="post"
                    >
                         <div className="trade-panel__field-group">
                              <label className="trade-panel__field-label" htmlFor="amount-input">
                                   Amount
                                   <Input
                                        placeholder="0.00"
                                        onChange={(e) => setBuyAmount(Number(e.target.value))}
                                        className="trade-panel__field-input"
                                        type="number"
                                   />
                              </label>
                         </div>

                         <div className="trade-panel__field-group">
                              <label className="trade-panel__field-label" htmlFor="price-input">
                                   Price (USDT)
                                   <Input
                                        disabled
                                        placeholder="0.00"
                                        onChange={(e) => setBuyPrice(Number(e.target.value))}
                                        className="trade-panel__field-input"
                                        value={buyPrice}
                                        type="number"
                                   />
                              </label>
                         </div>

                         <div className="trade-panel__field-group">
                              <label className="trade-panel__field-label" htmlFor="total-input">
                                   Total (USDT)
                                   <Input
                                        placeholder="0.00"
                                        className="trade-panel__field-input"
                                        type="number"
                                   />
                              </label>
                         </div>

                         <Button
                              type="submit"
                              onClick={handleBuy}
                              className={clsx("trade-panel__action-button", {
                                   "trade-panel__action-button--sell": actionType === "sell",
                              })}
                              variant={actionType === "buy" ? "primary" : "destructive"}
                         >
                              {firstUpper(actionType)} {coin.type}
                         </Button>
                    </form>

                    <div className="trade-panel__summary">
                         <div className="trade-panel__summary-row">
                              <p className="trade-panel__summary-label">Available USDT:</p>
                              <span className="trade-panel__summary-value">
                                   {user.balance.amount.toFixed(2)}
                              </span>
                         </div>
                         <div className="trade-panel__summary-row">
                              <p className="trade-panel__summary-label">Fee (0.1%):</p>
                              <span className="trade-panel__summary-value">0 USDT</span>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default TradingPanel;
