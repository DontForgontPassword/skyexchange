import { baseApi } from "@/shared/api";
import { RegisterRequest } from "./types";
import { ResultResponse } from "../../shared/model/types";

const registerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        performRegister: builder.mutation<ResultResponse, RegisterRequest>({
            query: ({ email, username, password }) => ({
                url: "/auth/register",
                method: "POST",
                body: {
                    email,
                    username,
                    password,
                },
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

export const { usePerformRegisterMutation } = registerApi;
