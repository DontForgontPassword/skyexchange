import { useState } from "react";
import { TRADE_FILTER_OPTIONS } from "@/shared/constants/Chart";
import { useUserStore } from "@/entities/User/model/store";
import { FilterType } from "@/shared/types";
import { Button } from "@/shared/ui/Button";
import { Filter } from "@/shared/ui/Filter";
import { Input } from "@/shared/ui/Input";
import { firstUpper } from "@/shared/utils/string";
import "./TradingPanel.scss";
import { toast } from "sonner";
import { useExchangeStore } from "@/entities/Exchange";

const TradingPanel = () => {
    const coin = useExchangeStore((s) => s.coins[s.currentCoinId]);
    const price = coin.price;
    const user = useUserStore((s) => s);
    const userBalance = user.getBalance(coin.id).value;
    const userBalanceName = user.defaultCurrency.toUpperCase();
    const [amount, setAmount] = useState<number>(0);
    const [actionType, setActionType] = useState<FilterType>("buy");

    const handleBuy = () => {
        toast.success(`Successfully buyed ${amount} ${coin.name}`);
    };

    return (
        <div className="trading-panel">
            <div className="trading-panel__inner">
                <div className="trading-panel__header">
                    <Filter
                        filters={TRADE_FILTER_OPTIONS}
                        filterType={actionType}
                        setFilterType={setActionType}
                        defaultValue={"sell"}
                    />
                </div>

                <div className="trading-panel__order-form">
                    <div className="trading-panel__field-group">
                        <label
                            className="trading-panel__field-label"
                            htmlFor="amount-input"
                        >
                            Amount
                            <Input
                                placeholder="0.00"
                                value={String(amount || "")}
                                onChange={(e) =>
                                    setAmount(Number(e.target.value) || 0)
                                }
                                className="trading-panel__field-input"
                                type="number"
                            />
                        </label>
                    </div>

                    <div className="trading-panel__field-group">
                        <label
                            className="trading-panel__field-label"
                            htmlFor="price-input"
                        >
                            Price (USDT)
                            <Input
                                disabled
                                placeholder="0.00"
                                className="trading-panel__field-input"
                                value={price}
                                type="number"
                            />
                        </label>
                    </div>

                    <div className="trading-panel__field-group">
                        <label
                            className="trading-panel__field-label"
                            htmlFor="total-input"
                        >
                            Total (USDT)
                            <Input
                                placeholder="0.00"
                                className="trading-panel__field-input"
                                type="number"
                                value={price}
                                readOnly
                            />
                        </label>
                    </div>

                    <Button
                        onClick={handleBuy}
                        className="trading-panel__action-button"
                        variant={
                            actionType === "buy" ? "default" : "destructive"
                        }
                        size={"default"}
                    >
                        {firstUpper(actionType)} {coin.pair}
                    </Button>
                </div>

                <div className="trading-panel__summary">
                    <div className="trading-panel__summary-row">
                        <p className="trading-panel__summary-label">
                            Available:
                        </p>
                        <span className="trading-panel__summary-value">
                            {`${userBalance} ${userBalanceName}`}
                        </span>
                    </div>
                    <div className="trading-panel__summary-row">
                        <p className="trading-panel__summary-label">
                            Fee (0.1%):
                        </p>
                        <span className="trading-panel__summary-value">
                            {`${(price * 0.1).toFixed(2)} ${userBalanceName}`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { TradingPanel };
