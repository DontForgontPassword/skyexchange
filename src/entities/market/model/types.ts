export type Order = {
    id: number;
    coinId: string;
    price: number;
    amount: number;
    total: number;
    type: "buy" | "sell";
};

export type Trade = {
    id: number;
    coinId: string;
    price: number;
    amount: number;
    total: number;
    type: "buy" | "sell";
};
