import { User } from "../model/types";

export type LoginRequest = {
    email: string;
    password: string;
};

export type ResultResponse = {
    user: User;
    accessToken: string;
    success: boolean;
};

export type RegisterRequest = {
    username: string;
    email: string;
    password: string;
};
