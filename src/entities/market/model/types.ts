export type IOrder = {
    id: number;
    coinId: string;
    price: number;
    amount: number;
    total: number;
    type: "buy" | "sell";
};

export type ITrade = {
    id: number;
    coinId: string;
    price: number;
    amount: number;
    total: number;
    type: "buy" | "sell";
};
