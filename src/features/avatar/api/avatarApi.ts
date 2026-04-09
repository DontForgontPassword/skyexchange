import { baseApi } from "@/shared/api";
import type { UpdateAvatarResponse } from "./type";

const avatarApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation<UpdateAvatarResponse, string>({
            query: (avatarImage) => ({
                url: "/user/avatar",
                method: "POST",
                body: { avatarImage },
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useUpdateAvatarMutation } = avatarApi;
