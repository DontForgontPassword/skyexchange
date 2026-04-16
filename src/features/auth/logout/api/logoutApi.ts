import { baseApi } from "@/shared/api";

const logoutApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        performLogout: builder.mutation<{ success: boolean }, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
                credentials: "include"
            }),
        }),
    }),
});

export const { usePerformLogoutMutation } = logoutApi;