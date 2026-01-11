export type CoinId = "btc" | "eth" | "sol" | "smg";
export type TradeType = "sell" | "buy";

export interface ICoin {
    id: CoinId;
    icon: string;
    symbol: string; // BTC
    pair: string; // BTC/USDT
    name: string; // Bitcoin
    price: number;
    change: number;
    rate: number;
}

export interface ITradeOrder {
    coinId: CoinId;
    price: number;
    amount: number;
    total: number;
    type: TradeType;
}
