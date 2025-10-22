import type { Column, Row } from "@/components/Table";
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

const ORDER_BOOK_DATA: Row[] = [
     { id: 1, price: 67167.33, amount: 10.29, total: 691299.87, type: "buy" },
     { id: 2, price: 67100.09, amount: 8.28, total: 555812.37, type: "buy" },
     { id: 3, price: 67032.86, amount: 7.06, total: 473345.78, type: "buy" },
     { id: 4, price: 66965.62, amount: 6.57, total: 440196.44, type: "sell" },
     { id: 5, price: 66898.39, amount: 3.47, total: 231864.46, type: "sell" }
]

const TRADE_DATA: Row[] = [
     { id: 1, price: 67167.33, amount: 10.29, total: 691299.87, type: "sell" },
     { id: 2, price: 67100.09, amount: 8.28, total: 555812.37, type: "buy" },
     { id: 3, price: 67032.86, amount: 7.06, total: 473345.78, type: "sell" },
     { id: 4, price: 66965.62, amount: 6.57, total: 440196.44, type: "buy" },
     { id: 5, price: 66898.39, amount: 3.47, total: 231864.46, type: "buy" }
]

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
     ORDER_BOOK_DATA,
     TRADE_COLUMNS,
     BOOK_FILTER_OPTIONS,
     TRADE_FILTER_OPTIONS,
     TRADE_DATA,
     CHART_RANGES
}