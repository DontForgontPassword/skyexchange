import { useEffect, useMemo, useState } from "react";
import { TRADE_FILTER_OPTIONS } from "@/shared/config";
import { FilterType } from "@/shared/model";
import { Button } from "@/shared/ui/Button";
import { Filter } from "@/shared/ui/Filter";
import { Input } from "@/shared/ui/Input";
import { Card } from "@/shared/ui/Card";
import { firstUpper } from "@/shared/lib/string";
import { toast } from "sonner";
import { useGetBalanceQuery } from "@/entities/user";
import { useGetMarketQuery } from "@/entities/market";
import { useAppSelector } from "@/app/provider";
import "./TradingPanel.scss";

const FEE_PERCENT = 0.001;

const TradingPanel = () => {
    const [amount, setAmount] = useState<number>(0);
    const [actionType, setActionType] = useState<FilterType>("buy");

    const isAuthorized = useAppSelector((state) => state.auth.isAuthenticated);

    const {
        data: marketData,
        isError: isMarketError,
        isLoading: isMarketLoading,
    } = useGetMarketQuery();

    const {
        data: balance,
        isError: isBalanceError,
        isLoading: isBalanceLoading,
    } = useGetBalanceQuery(undefined, { skip: !isAuthorized });

    useEffect(() => {
        if (isMarketError || isBalanceError) {
            toast.error("Internal server error");
        }
    }, [isMarketError, isBalanceError]);

    const coin = marketData?.coins?.[0];

    const price = coin?.price ?? 0;

    const total = useMemo(() => price * amount, [price, amount]);

    const fee = useMemo(() => total * FEE_PERCENT, [total]);

    const handleTrade = () => {
        if (!isAuthorized) {
            toast.error("You must be logged in");
            return;
        }

        if (!amount || amount <= 0) {
            toast.error("Enter valid amount");
            return;
        }

        if (!coin) {
            toast.error("Market data unavailable");
            return;
        }

        toast.success(
            `Successfully ${
                actionType === "buy" ? "bought" : "sold"
            } ${amount} ${coin.name}`,
        );
    };

    if (isMarketLoading || (isAuthorized && isBalanceLoading)) {
        return <Card className="trading-panel">Loading...</Card>;
    }

    return (
        <Card className="trading-panel">
            <div className="trading-panel__header">
                <Filter
                    filters={TRADE_FILTER_OPTIONS}
                    filterType={actionType}
                    setFilterType={setActionType}
                    defaultValue="buy"
                />
            </div>

            <div className="trading-panel__order-form">
                <label className="trading-panel__field-label">
                    Amount
                    <Input
                        placeholder="0.00"
                        value={amount || ""}
                        max={amount * price}
                        onChange={(e) => setAmount(Number(e.target.value) || 0)}
                        type="number"
                        disabled={!isAuthorized}
                    />
                </label>

                <label className="trading-panel__field-label">
                    Price (USDT)
                    <Input disabled value={price} />
                </label>

                <label className="trading-panel__field-label">
                    Total (USDT)
                    <Input disabled value={total} readOnly />
                </label>

                <Button
                    onClick={handleTrade}
                    variant={actionType === "buy" ? "default" : "destructive"}
                    disabled={!isAuthorized || !coin}
                >
                    {coin?.symbol
                        ? `${firstUpper(actionType)} ${coin.symbol}`
                        : "Trade"}
                </Button>
            </div>

            <div className="trading-panel__summary summary">
                <p className="summary__text">
                    Available:
                    <span className="summary__data">
                        {balance
                            ? ` ${balance.amount} ${coin?.id ?? ""}`
                            : " —"}
                    </span>
                </p>

                <p className="summary__text">
                    Fee ({FEE_PERCENT * 100}%):
                    <span className="summary__data">
                        {` ${fee.toFixed(6)} ${coin?.id ?? ""}`}
                    </span>
                </p>
            </div>
        </Card>
    );
};

export { TradingPanel };
