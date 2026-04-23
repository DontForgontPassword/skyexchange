import {
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_PUBLIC_API_URL,
    credentials: "include",
});

export const baseQueryWithToast: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
        const error = result.error;

        let message = "Something went wrong";

        if ("data" in error) {
            const data = error.data as { detail?: string; message?: string };

            message = data?.detail || data?.message || message;
        }

        toast.error(message);
    }

    return result;
};
