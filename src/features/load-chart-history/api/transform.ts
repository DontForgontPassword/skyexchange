import { ChartCandle } from "../model/types";
import { Candle } from "./types";

export const transformCandles = (response: Candle[]): ChartCandle[] => {
    return response.map((c) => ({
        name: c.symbol,
        uv: c.close,
        pv: c.open,
        high: c.high,
        low: c.low,
    }))
}