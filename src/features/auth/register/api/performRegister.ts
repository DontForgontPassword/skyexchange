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
            invalidatesTags: ["User", "Balance"]
        }),
    })
});

export const { usePerformRegisterMutation } = registerApi;