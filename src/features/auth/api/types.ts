import { User } from "@/shared/types/user";

export type IAuthState = {
    user: User | null;
    accessToken: string | null;
};

export type IAuthResponse = {
    user: User;
    accessToken: string;
};

export type IAuthTypes = "register" | "login";
