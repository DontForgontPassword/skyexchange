import { User } from "@/entities/user";

export type AuthTypes = "login" | "register";

export type ResultResponse = {
    user: User;
    accessToken: string;
    success: boolean;
};