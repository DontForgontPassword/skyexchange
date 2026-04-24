import { TrendingUp, TrendingDown } from "lucide-react";
import { formatPrice } from "@/shared/lib/price";
import { OrderActivity, TradeActivity } from "@/entities/market";
import { useAppSelector } from "@/app/provider";
import { BASE_URL } from "@/shared/config";
import {
    ChartRangeSelector,
    useChartRange,
} from "@/features/change-chart-range";
import { clsx } from "clsx";
import "./ChartPanel.scss";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useGetHistoryQuery } from "@/features/load-chart-history";
import { ChartTooltip } from "@/entities/chart";

const ChartPanel = () => {
    const { range, setRange } = useChartRange();

    const currentCoin = useAppSelector((state) => state.crypto.selectedCrypto);
    const { data: chartData, isLoading } = useGetHistoryQuery(
        {
            symbol: currentCoin?.symbol || "BTC",
            interval: range,
        },
        {
            pollingInterval: 10000,
        },
    );

    if (!currentCoin) return null;

    const data = chartData ?? [];

    const firstPrice = data[0]?.price;
    const lastPrice = data[data.length - 1]?.price;

    const isPositive =
        firstPrice !== undefined && lastPrice !== undefined
            ? lastPrice >= firstPrice
            : true;
    const icon = `${BASE_URL}${currentCoin.icon}`;

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
                                        {`${isPositive ? "+" : ""}${currentCoin.change.toFixed(2)}`}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="chart-panel__periods">
                            <ChartRangeSelector
                                value={range}
                                onChange={setRange}
                            />
                        </div>
                    </div>

                    <div className="chart-panel__graph">
                        {isLoading ? (
                            <div className="chart-panel__loader">
                                Loading chart...
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    data={chartData ?? []}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="colorPrice"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor={
                                                    isPositive
                                                        ? "#10b981"
                                                        : "#ef4444"
                                                }
                                                stopOpacity={0.3}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor={
                                                    isPositive
                                                        ? "#10b981"
                                                        : "#ef4444"
                                                }
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="rgba(255,255,255,0.05)"
                                    />
                                    <XAxis
                                        dataKey="time"
                                        type="number"
                                        domain={["dataMin", "dataMax"]}
                                        tickFormatter={(t) =>
                                            new Date(t).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                        }
                                        stroke="#888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        minTickGap={30}
                                    />

                                    <YAxis
                                        domain={["auto", "auto"]}
                                        orientation="right"
                                        stroke="#888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(val) =>
                                            `$${formatPrice(val)}`
                                        }
                                    />

                                    <Tooltip content={<ChartTooltip />} />

                                    <Area
                                        type="linear"
                                        dataKey="price"
                                        stroke={
                                            isPositive ? "#10b981" : "#ef4444"
                                        }
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorPrice)"
                                        animationDuration={1000}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
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
