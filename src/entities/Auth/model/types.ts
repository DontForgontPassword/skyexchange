import { User } from "@/entities/User/model/types";

export interface IAuthState {
    user: User | null;
    accessToken: string | null;
}

export interface IAuthResponse {
    status: boolean;
    message: string;
}

export type IAuthTypes = "register" | "login";