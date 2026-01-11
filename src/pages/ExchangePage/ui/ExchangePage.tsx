import { ChartPanel } from "@/widgets/ChartPanel";
import { TradingPairsPanel } from "@/widgets/TradingPairsPanel";
import { TradingPanel } from "@/widgets/TradingPanel";
import { useEffect } from "react";
import { useExchangeStore } from "@/entities/Exchange";
import "./ExchangePage.scss";

export const ExchangePage = () => {
    const updatePrices = useExchangeStore((s) => s.updatePrices);

    useEffect(() => {
        updatePrices();

        const interval = setInterval(() => {
            updatePrices();
        }, 2000);

        return () => clearInterval(interval);
    }, [updatePrices]);

    return (
        <section className="exchange-page">
            <div className="exchange-page__inner container">
                <TradingPairsPanel />
                <ChartPanel />
                <TradingPanel />
            </div>
        </section>
    );
};
