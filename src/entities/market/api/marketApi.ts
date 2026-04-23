import { baseApi } from "@/shared/api";
import { MarketData } from "./types";
import { Order, Trade } from "../model/types";

const marketApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMarket: builder.query<MarketData, void>({
            query: () => "/exchange/market",
            providesTags: ["Market"],
        }),
        getOrders: builder.query<Order[], void>({
            query: () => "/exchange/order-activity",
            providesTags: ["Orders"],
        }),
        getTrades: builder.query<Trade[], void>({
            query: () => "/exchange/trade-activity",
            providesTags: ["Trades"],
        }),
        createTrade: builder.mutation<void, { coin_id: string; amount: number; action: "buy" | "sell" }>({
            query: (body) => ({
                url: "/exchange/trade",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Balance", "Market", "Orders", "Trades"],
        }),
    }),
});

export const {
    useGetMarketQuery,
    useGetOrdersQuery,
    useGetTradesQuery,
    useCreateTradeMutation
} = marketApi;
