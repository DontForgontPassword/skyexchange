import type { Column } from "@/components/table";
import { filterType } from "../types";

const ORDER_COLUMNS: Column[] = [
     { name: "Price" },
     { name: "Amount" },
     { name: "Total" }
];

const TRADE_COLUMNS: Column[] = [
     { name: "Price" },
     { name: "Amount" },
     { name: "Total" }
];

const BOOK_FILTER_OPTIONS: { label: string, type: filterType }[] = [
     { label: "Buy Orders", type: "buy" },
     { label: "Sell Orders", type: "sell" },
]

const TRADE_FILTER_OPTIONS: {
     label: string, type: filterType
}[] = [
          { label: "Sell", type: "sell" },
          { label: "Buy", type: "buy" }
     ];

const CHART_RANGES = [
     "1H", "24H", "7D", "1M", "All"
]

export {
     ORDER_COLUMNS,
     TRADE_COLUMNS,
     BOOK_FILTER_OPTIONS,
     TRADE_FILTER_OPTIONS,
     CHART_RANGES
}