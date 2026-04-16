import { baseApi } from "@/shared/api";
import { RegisterRequest } from "./types";
import { User } from "@/entities/user";

const registerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
    })
});

export const { usePerformRegisterMutation } = registerApi;