import { create } from "zustand";
import { AuthAPI } from "../api/auth";
import { IAuthState } from "./types";
import { persist } from "zustand/middleware";

interface IAuthStore extends IAuthState {
    login: (email: string, password: string) => void,
    register: (
        username: string,
        email: string,
        password: string,
    ) => void;
    logout: () => void;
}

export const useAuthStore = create<IAuthStore>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,

            login: async (email, password) => {
                const { data } = await AuthAPI.login(email, password);
                set({
                    user: data.user,
                    accessToken: data.accessToken,
                });
            },

            register: async (username, email, password) => {
                const { data } = await AuthAPI.register(
                    username,
                    email,
                    password,
                );
                set({
                    user: data.user,
                    accessToken: data.accessToken,
                });
            },

            logout: () => {
                set({ user: null, accessToken: null });
            },
        }),
        {
            name: "auth-storage",
        },
    ),
);
