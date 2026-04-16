import { Balance } from "@/shared/model";
import { User } from "../model/types";
import { baseApi } from "@/shared/api";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMe: builder.query<User, void>({
            query: () => "/user/me",
            providesTags: ["User"]
        }),

        getBalance: builder.query<Balance, void>({
            query: () => "/user/balance",
            providesTags: ["Balance"]
        }),

    }),
});

export const {
    useGetMeQuery,
    useGetBalanceQuery,
} = userApi;
