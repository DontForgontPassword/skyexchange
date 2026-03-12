import { clsx } from "clsx";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";
import {
    BOOK_FILTER_OPTIONS,
    CHART_RANGES,
    HISTORY_COLUMNS,
} from "@/shared/constants/Chart";
import { formatPrice } from "@/shared/utils/format";
import { Button } from "@/shared/ui/Button";
import "./ChartPanel.scss";
import { ChartHistory } from "../ChartHistory";
import { useExchangeStore } from "@/entities/Exchange";

const ChartPanel = () => {
    const [activeRange, setActiveRange] = useState<string>(CHART_RANGES[0]);

    const trades = useExchangeStore((s) => s.trades);
    const orders = useExchangeStore((s) => s.orders);

    const currentCoin = useExchangeStore((s) => s.coins[s.currentCoinId]);

    const isPositive = currentCoin.change >= 0;

    useEffect(() => {
        console.log(activeRange);
    }, [activeRange]);

    return (
        <div className="chart-panel">
            <div className="chart-panel__inner">
                <div className="chart-panel__card">
                    <div className="chart-panel__top">
                        <div className="chart-panel__header">
                            <div className="chart-panel__header-title">
                                <img
                                    src={currentCoin.icon}
                                    className="chart-panel__header-icon"
                                />
                                <h2 className="chart-panel__header-pair">
                                    {currentCoin.name}
                                </h2>
                            </div>

                            <div className="chart-panel__header-info">
                                <span className="chart-panel__header-price">
                                    {`$${formatPrice(currentCoin.price)}`}
                                </span>
                                <div
                                    className={clsx(
                                        "chart-panel__header-change",
                                        isPositive
                                            ? "chart-panel__header-change--positive"
                                            : "chart-panel__header-change--negative"
                                    )}
                                >
                                    {isPositive ? (
                                        <TrendingUp
                                            width={16}
                                            height={16}
                                            className="chart-panel__header-change-icon"
                                        />
                                    ) : (
                                        <TrendingDown
                                            width={16}
                                            height={16}
                                            className="chart-panel__header-change-icon"
                                        />
                                    )}
                                    <span className="chart-panel__header-change-text">
                                        {isPositive
                                            ? `+${currentCoin.change}`
                                            : `${currentCoin.change}`}
                                        %
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="chart-panel__periods">
                            {CHART_RANGES.map((range) => (
                                <Button
                                    key={range}
                                    size={"sm"}
                                    variant={"dark"}
                                    className={clsx(
                                        "chart-panel__periods-button"
                                    )}
                                    onClick={() => setActiveRange(range)}
                                >
                                    {range}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="chart-panel__graph"></div>
                </div>

                <div className="chart-panel__market-data">
                    <ChartHistory
                        className="chart-panel__orders-card"
                        title="Order Book"
                        data={orders}
                        filters={BOOK_FILTER_OPTIONS}
                        columns={HISTORY_COLUMNS}
                    />
                    <ChartHistory
                        className="chart-panel__trades-card"
                        title="Recent Trades"
                        data={trades}
                        columns={HISTORY_COLUMNS}
                    />
                </div>
            </div>
        </div>
    );
};

export { ChartPanel };
