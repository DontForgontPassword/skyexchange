export type Candle = {
    symbol: string;
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export type HistoryRequest = {
    symbol: string;
    interval: string;
    limit?: number
};