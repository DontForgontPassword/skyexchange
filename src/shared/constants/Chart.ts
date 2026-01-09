import { Column, FilterType } from "../types";

const HISTORY_COLUMNS: Column[] = [
    { name: "Coin" },
    { name: "Price" },
    { name: "Amount" },
    { name: "Total" },
];

const BOOK_FILTER_OPTIONS: { label: string; type: FilterType }[] = [
    { label: "Buy Orders", type: "buy" },
    { label: "Sell Orders", type: "sell" },
];

const TRADE_FILTER_OPTIONS: {
    label: string;
    type: FilterType;
}[] = [
    { label: "Buy", type: "buy" },
    { label: "Sell", type: "sell" },
];

const CHART_RANGES = ["1H", "24H", "7D", "1M", "All"];

const RANGE_TO_MS: Record<string, number> = {
    "1H": 60 * 60 * 1000,
    "6H": 6 * 60 * 60 * 1000,
    "12H": 12 * 60 * 60 * 1000,
    "1D": 24 * 60 * 60 * 1000,
    "1W": 7 * 24 * 60 * 60 * 1000,
};

const ZONE_TIME = new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Warsaw",
});

export {
    BOOK_FILTER_OPTIONS,
    TRADE_FILTER_OPTIONS,
    CHART_RANGES,
    RANGE_TO_MS,
    ZONE_TIME,
    HISTORY_COLUMNS,
};
