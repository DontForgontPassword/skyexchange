import { TrendingUp, TrendingDown } from "lucide-react";
import { formatPrice } from "@/shared/lib/price";
import { OrderActivity, TradeActivity } from "@/entities/market";
import { useAppSelector } from "@/app/provider";
import { BASE_URL } from "@/shared/config";
import { ChartRangeSelector, useChartRange } from "@/features/change-chart-range";
import { clsx } from "clsx";
import "./ChartPanel.scss";
import { useEffect } from "react";
import { useGetHistoryQuery } from "@/features/load-chart-history";
import { toast } from "sonner";

const ChartPanel = () => {
    const { range, setRange } = useChartRange();

    const currentCoin = useAppSelector((state) => state.crypto.selectedCrypto);
    // const { data, isLoading } = useGetHistoryQuery(
    //     {
    //         symbol: currentCoin?.symbol || "BTC",
    //         interval: range
    //     },
    //     {
    //         pollingInterval: 10000
    //     }
    // );
    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    if (!currentCoin) return null;

    const isPositive = currentCoin.change >= 0;
    const icon = `${BASE_URL}${currentCoin.icon}`

    return (
        <div className="chart-panel">
            <div className="chart-panel__inner">
                <div className="chart-panel__card">
                    <div className="chart-panel__top">
                        <div className="chart-panel__header">
                            <div className="chart-panel__header-title">
                                <img
                                    src={icon}
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
                                            : "chart-panel__header-change--negative",
                                    )}
                                >
                                    {isPositive ? (
                                        <TrendingUp width={16} height={16} />
                                    ) : (
                                        <TrendingDown width={16} height={16} />
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
                            {/* Implement chart ranges  */}
                            {/* feature */}
                            <ChartRangeSelector value={range} onChange={setRange} />
                        </div>
                    </div>

                    <div className="chart-panel__graph">

                    </div>
                </div>

                <div className="chart-panel__market-data">
                    <OrderActivity className="chart-panel__orders-card" />
                    <TradeActivity className="chart-panel__trades-card" />
                </div>
            </div>
        </div>
    );
};

export { ChartPanel };
