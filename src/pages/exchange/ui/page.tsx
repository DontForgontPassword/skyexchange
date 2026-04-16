import { ChartPanel } from "./ChartPanel";
import { TradingPanel } from "./TradingPanel";
import { CryptoSelector } from "@/features/change-crypto-selection";
import "./page.scss";

export const ExchangePage = () => {
    return (
        <section className="exchange-page">
            <div className="exchange-page__inner container">
                <CryptoSelector />
                <ChartPanel />
                <TradingPanel />
            </div>
        </section>
    );
};
