import { baseApi } from "@/shared/api";
import { HistoryRequest } from "./types";
import { transformCandles } from "./transform";
import { ChartCandle } from "../model/types";

const chartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getHistory: builder.query<ChartCandle[], HistoryRequest>({
            query: ({ symbol, interval, limit = 100 }) => ({
                url: "/exchange/history",
                params: { symbol, interval, limit },
            }),
            providesTags: ["History"],
            transformResponse: transformCandles,
        })
    })
});

export const { useGetHistoryQuery } = chartApi;