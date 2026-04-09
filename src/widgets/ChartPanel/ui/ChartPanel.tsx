import { TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import { CHART_RANGES } from "@/shared/config";
import { formatPrice } from "@/shared/lib/price";
import { Button } from "@/shared/ui/Button";
import { clsx } from "clsx";
import { OrderActivity, TradeActivity } from "@/entities/market";
import { useAppSelector } from "@/app/provider";
import { BASE_URL } from "@/shared/config";
import "./ChartPanel.scss";

const ChartPanel = () => {
    const [activeRange, setActiveRange] = useState<string>(CHART_RANGES[0]);

    const currentCoin = useAppSelector((state) => state.crypto.selectedCrypto);

    if (!currentCoin) return;

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
                            {CHART_RANGES.map((range) => (
                                <Button
                                    key={range}
                                    size={"sm"}
                                    variant={
                                        activeRange === range
                                            ? "default"
                                            : "dark"
                                    }
                                    className="chart-panel__periods-button"
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
                    <OrderActivity className="chart-panel__orders-card" />
                    <TradeActivity className="chart-panel__trades-card" />
                </div>
            </div>
        </div>
    );
};

export { ChartPanel };
