export interface IOrder {
    id?: number;
    coinId: "btc" | "eth" | "sol" | "smg";
    price: number;
    amount: number;
    total: number;
    type: "sell" | "buy";
}

export interface ITrade {
    id?: number;
    coinId: "btc" | "eth" | "sol" | "smg";
    price: number;
    amount: number;
    total: number;
    type: "sell" | "buy";
}