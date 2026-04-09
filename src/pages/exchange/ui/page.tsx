import { ChartPanel } from "@/widgets/ChartPanel";
import { TradingPanel } from "./TradingPanel";
import { CryptoSelector } from "@/features/crypto-selector";
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
