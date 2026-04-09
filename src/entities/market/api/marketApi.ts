import { baseApi } from "@/shared/api";
import { MarketData } from "./types";
import { IOrder, ITrade } from "@/shared/model/types";

const marketApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMarket: builder.query<MarketData, void>({
            query: () => "/exchange/market",
        }),
        getOrders: builder.query<IOrder[], void>({
            query: () => "/exchange/order-activity",
        }),
        getTrades: builder.query<ITrade[], void>({
            query: () => "/exchange/trade-activity",
        }),
    }),
});

export const { useGetMarketQuery, useGetOrdersQuery, useGetTradesQuery } =
    marketApi;
