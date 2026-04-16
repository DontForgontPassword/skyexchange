import { baseApi } from "@/shared/api";
import { Candle, HistoryRequest } from "./types";
import { transformCandles } from "./transform";

const chartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getHistory: builder.query<Candle[], HistoryRequest>({
            query: ({ symbol, interval, limit = 100 }) => ({
                url: "/exchange/history",
                params: { symbol, interval, limit },
            }),
        })
    })
});

export const { useGetHistoryQuery } = chartApi;