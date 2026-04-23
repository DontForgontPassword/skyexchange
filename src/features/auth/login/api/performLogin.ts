import { baseApi } from "@/shared/api";
import { LoginRequest } from "./types";
import { ResultResponse } from "../../shared/model/types";

export const loginApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        performLogin: builder.mutation<ResultResponse, LoginRequest>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;

                    dispatch(baseApi.util.invalidateTags(["User", "Balance"]));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});

export const { usePerformLoginMutation } = loginApi;
