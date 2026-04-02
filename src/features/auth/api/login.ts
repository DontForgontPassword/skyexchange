import { api } from "@/shared/api";
import { IAuthResponse } from "./types";

export const login = async (email: string, password: string) => {
    const { data } = await api.post<IAuthResponse>("/api/auth/login", {
        email,
        password,
    });

    return data;
};