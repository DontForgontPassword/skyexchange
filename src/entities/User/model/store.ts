import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GUEST_USER, DEFAULT_BALANCES } from "./constants";
import { UserState } from "./types";
import { useNftStore } from "@/entities/Nft/model/store";

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            ...GUEST_USER,

            setAvatar: (avatarImage) => set({ avatarImage }),

            register: (username, email, password) =>
                set({
                    id: crypto.randomUUID(),
                    username,
                    email,
                    token: `${username}:${btoa(password)}`,
                    createdAt: new Date().toISOString(),
                }),

            addBalance: (currency, value) =>
                set((s) => ({
                    balances: {
                        ...s.balances,
                        [currency]: {
                            ...s.balances[currency],
                            value: s.balances[currency].value + value,
                        },
                    },
                })),
            subBalance: (currency, value) =>
                set((s) => ({
                    balances: {
                        ...s.balances,
                        [currency]: {
                            ...s.balances[currency],
                            value: s.balances[currency].value - value,
                        },
                    },
                })),

            addNFT: (nft) => set((s) => ({ nfts: [...s.nfts, nft] })),

            reset: () =>
                set({
                    ...GUEST_USER,
                    balances: DEFAULT_BALANCES,
                }),
            getBalance: (currency) => get().balances[currency],

            getBalanceValue: (currency) => get().balances[currency].value,

            getDefaultBalance: () => {
                const { balances, defaultCurrency } = get();
                return balances[defaultCurrency];
            },

            getDefaultBalanceValue: () => {
                const { balances, defaultCurrency } = get();
                return balances[defaultCurrency].value;
            },
        }),
        { name: "user-storage" }
    )
);
