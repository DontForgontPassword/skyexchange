import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithToast } from "./baseQueryWithToast";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithToast,
    endpoints: () => ({}),
    tagTypes: ["NFT", "Balance", "User", "Market", "Orders", "Trades", "History"],
});
