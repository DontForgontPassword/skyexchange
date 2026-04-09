import { Balance } from "@/shared/model";
import { LoginRequest, ResultResponse, RegisterRequest } from "./types";
import { User } from "../model/types";
import { baseApi } from "@/shared/api";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        performLogin: builder.mutation<ResultResponse, LoginRequest>({
            query: ({ email, password }) => ({
                url: "/auth/login",
                method: "POST",
                body: { email, password },
                headers: {
                    "Content-Type": "application/json",
                },
                invalidatesTags: ["User"],
            }),
        }),
        performRegister: builder.mutation<User, RegisterRequest>({
            query: ({ email, username, password }) => ({
                url: "/auth/register",
                method: "POST",
                body: {
                    email,
                    username,
                    password,
                },
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
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
    usePerformLoginMutation,
    usePerformRegisterMutation,
} = userApi;
