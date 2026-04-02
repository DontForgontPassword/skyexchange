import { api } from "@/shared/api";
import { IAuthResponse } from "./types";

export const register = async (
    username: string,
    email: string,
    password: string,
) => {
    const { data } = await api.post<IAuthResponse>("/api/auth/register", {
        username,
        email,
        password,
    });

    return data;
};
