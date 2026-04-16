import { baseApi } from "@/shared/api";
import { EditProfileRequest, EditProfileResponse } from "./types";

const editProfileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        editProfile: builder.mutation<EditProfileResponse, EditProfileRequest>({
            query: ({ email, username }) => ({
                url: "/user/edit",
                method: "POST",
                body: {
                    username,
                    email
                },
                headers: {
                    "Content-Type": "application/json"
                }
            }),
        }),
    })
})

export const { useEditProfileMutation } = editProfileApi;