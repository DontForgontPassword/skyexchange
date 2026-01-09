import { useState } from "react";
import { useExchangeStore } from "@/shared/store/useExchangeStore.ts";
import { TRADE_FILTER_OPTIONS } from "@/shared/constants/Chart";
import { useUser } from "@/shared/store/useUser";
import { FilterType } from "@/shared/types";
import { Button } from "@/shared/ui/button";
import { Filter } from "@/shared/ui/filter";
import { Input } from "@/shared/ui/input";
import { firstUpper } from "@/shared/utils/string";
import "./TradingPanel.scss";

const TradingPanel = () => {
    const coin = useExchangeStore((s) => s.currentCoin);
    const price = coin.price;
    const user = useUser();
    const userBalance = user.getDefaultBalance().value;
    const userBalanceName = user.defaultCurrency.toUpperCase();
    const [amount, setAmount] = useState<number>(0);
    const [actionType, setActionType] = useState<FilterType>("buy");

    const handleBuy = () => {};

    return (
        <div className="trade-panel">
            <div className="trade-panel__inner">
                <div className="trade-panel__header">
                    <Filter
                        filters={TRADE_FILTER_OPTIONS}
                        filterType={actionType}
                        setFilterType={setActionType}
                        defaultValue={"sell"}
                    />
                </div>

                <div className="trade-panel__order-form">
                    <div className="trade-panel__field-group">
                        <label
                            className="trade-panel__field-label"
                            htmlFor="amount-input"
                        >
                            Amount
                            <Input
                                placeholder="0.00"
                                value={String(amount || "")}
                                onChange={(e) =>
                                    setAmount(Number(e.target.value) || 0)
                                }
                                className="trade-panel__field-input"
                                type="number"
                            />
                        </label>
                    </div>

                    <div className="trade-panel__field-group">
                        <label
                            className="trade-panel__field-label"
                            htmlFor="price-input"
                        >
                            Price (USDT)
                            <Input
                                disabled
                                placeholder="0.00"
                                className="trade-panel__field-input"
                                value={price}
                                type="number"
                            />
                        </label>
                    </div>

                    <div className="trade-panel__field-group">
                        <label
                            className="trade-panel__field-label"
                            htmlFor="total-input"
                        >
                            Total (USDT)
                            <Input
                                placeholder="0.00"
                                className="trade-panel__field-input"
                                type="number"
                                value={price}
                                readOnly
                            />
                        </label>
                    </div>

                    <Button
                        onClick={handleBuy}
                        className="trade-panel__action-button"
                        variant={
                            actionType === "buy" ? "default" : "destructive"
                        }
                        size={"default"}
                    >
                        {firstUpper(actionType)} {coin.type}
                    </Button>
                </div>

                <div className="trade-panel__summary">
                    <div className="trade-panel__summary-row">
                        <p className="trade-panel__summary-label">Available:</p>
                        <span className="trade-panel__summary-value">
                            {`${userBalance} ${userBalanceName}`}
                        </span>
                    </div>
                    <div className="trade-panel__summary-row">
                        <p className="trade-panel__summary-label">
                            Fee (0.1%):
                        </p>
                        <span className="trade-panel__summary-value">
                            {`${price * 0.1} ${userBalanceName}`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { TradingPanel };
