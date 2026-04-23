import { ChartCandle } from "../model/types";
import { Candle } from "./types";

export const transformCandles = (candles: Candle[]): ChartCandle[] =>
    candles
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((candle) => ({
            time: candle.timestamp * 1000,
            price: candle.close,
        }));
