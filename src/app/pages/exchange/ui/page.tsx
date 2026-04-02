import { ChartPanel } from "@/widgets/ChartPanel";
import { TradingPairsPanel } from "@/widgets/TradingPairsPanel";
import { TradingPanel } from "@/widgets/TradingPanel";
import "./page.scss";

export const ExchangePage = () => {
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
