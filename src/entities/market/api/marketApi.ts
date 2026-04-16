import { baseApi } from "@/shared/api";
import { MarketData } from "./types";
import { Order, Trade } from "../model/types";

const marketApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMarket: builder.query<MarketData, void>({
            query: () => "/exchange/market",
        }),
        getOrders: builder.query<Order[], void>({
            query: () => "/exchange/order-activity",
        }),
        getTrades: builder.query<Trade[], void>({
            query: () => "/exchange/trade-activity",
        }),
    }),
});

export const { useGetMarketQuery, useGetOrdersQuery, useGetTradesQuery } =
    marketApi;
