import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAuthResponse, IAuthState } from "../api/types";

interface IAuthStore extends IAuthState {
    setAuth: (data: IAuthResponse) => void;
    logout: () => void;
}

export const useAuthStore = create<IAuthStore>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,

            setAuth: (data) => {
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