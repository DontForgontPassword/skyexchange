import { baseApi } from "@/shared/api";
import { LoginRequest } from "./types";
import { ResultResponse } from "../../shared/model/types";

export const loginApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        performLogin: builder.mutation<ResultResponse, LoginRequest>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body
            }),
            invalidatesTags: ["User"]
        }),
    }),
});

export const { usePerformLoginMutation } = loginApi;