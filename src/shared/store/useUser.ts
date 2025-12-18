import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface INFT {
    id: string;
    name: string;
}

export interface IUser {
    id: string;
    username: string;
    email: string;
    token: string | null;
    avatarNftId: string;
    balances: {
        btc: {
            value: number;
            name: string;
        };
        eth: {
            value: number;
            name: string;
        };
        sol: {
            value: number;
            name: string;
        };
        smg: {
            value: number;
            name: string;
        };
    };
    defaultCurrency: keyof IUser['balances'];
    nfts: INFT[];
    game: { score: number; rank: number };
    createdAt: string;

    register: (u: string, e: string, p: string) => void;
    add: (id: string, n: number) => void;
    getDefaultBalance: () => { value: number; name: string };
    remove: (id: string, n: number) => boolean;
    save: (nft: INFT) => void;
    reset: () => void;
}

const useUser = create<IUser>()(
    persist(
        (set, get) => ({
            id: 'guest',
            username: 'Guest',
            email: 'guest@mail.com',
            token: null,
            avatarNftId: '',
            balances: {
                btc: { value: 0, name: 'btc' },
                eth: { value: 0, name: 'eth' },
                sol: { value: 0, name: 'sol' },
                smg: { value: 0, name: 'smg' },
            },
            defaultCurrency: 'smg',
            nfts: [],
            game: { score: 0, rank: 0 },
            createdAt: '',

            register: (u, e, p) =>
                set({
                    id: crypto.randomUUID(),
                    username: u,
                    email: e,
                    token: `${u}:${btoa(p)}`,
                    createdAt: new Date().toISOString(),
                }),
            add: (id, n) =>
                set((s) => {
                    const key = id as keyof IUser['balances'];
                    return {
                        balances: {
                            ...s.balances,
                            [key]: {
                                ...s.balances[key],
                                value: s.balances[key].value + n,
                            },
                        },
                    };
                }),

            getDefaultBalance: () => {
                const state = get();
                return state.balances[state.defaultCurrency];
            },
            save: (nft) => set((s) => ({ nfts: [...s.nfts, nft] })),

            remove: (id, n) => {
                return true;
            },

            reset: () =>
                set({
                    id: 'guest',
                    username: 'Guest',
                    email: 'guest@mail.com',
                    token: null,
                    avatarNftId: '',
                    balances: {
                        btc: { value: 0, name: 'Bitcoin' },
                        eth: { value: 0, name: 'Ethereum' },
                        sol: { value: 0, name: 'Solana' },
                        smg: { value: 0, name: 'SMG Coins' },
                    },
                    defaultCurrency: 'smg',
                    nfts: [],
                    game: { score: 0, rank: 0 },
                    createdAt: '',
                }),
        }),
        { name: 'user-storage' },
    ),
);

export { useUser };
