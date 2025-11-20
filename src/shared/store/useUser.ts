import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface INFT {
     id: string;
     name: string;
     image: string;
     price: number;
     isSellable: boolean;
     ownerId: string;
}

interface IBalance {
     id: "btc" | "smg" | "eth" | "sol";
     amount: number;
};

export interface IUser {
     id: string;
     username: string;
     email: string;
     token?: string | null;
     avatarNftId: string;
     balance: IBalance;
     nfts: INFT[];
     game: {
          score: number;
          rank?: number;
          playedCount: number;
     };
     createdAt: string;
     lastLogin?: string;

     getCurrentProfileCoin: () => IBalance;
     addBalance: (amount: number) => void;
     removeBalance: (amount: number) => boolean;
     saveNft: (nft: INFT) => void;
     resetUser: () => void;
     registerUser: (username: string, email: string, password: string) => void;
}

export const useUser = create<IUser>()(
     persist(
          (set, get) => ({
               id: "player-none",
               username: "Guest",
               email: "guest@example.com",
               token: null,
               avatarNftId: "",
               balance:
               {
                    id: "smg",
                    amount: 0,
               },
               nfts: [],
               game: { score: 0, rank: 0, playedCount: 0 },
               createdAt: "",

               registerUser: (username: string, email: string, password: string) => {
                    const safePassword = btoa(unescape(encodeURIComponent(password)));

                    set(() => ({
                         id: `player-${crypto.randomUUID()}`,
                         username,
                         email,
                         token: `${username}:${safePassword}`,
                         avatarNftId: "",
                         balance: {
                              id: "smg",
                              amount: 0
                         },
                         nfts: [],
                         game: { score: 0, rank: 0, playedCount: 0 },
                         createdAt: new Date().toISOString(),
                         lastLogin: new Date().toISOString(),
                    }));
               },
               getCurrentProfileCoin: () => {
                    return get().balance;
               },
               addBalance: (amount: number) =>
                    set((state) => ({
                         balance: {
                              id: state.balance.id,
                              amount: state.balance.amount + amount,
                         },
                    })),

               removeBalance: (amount: number) => {
                    const state = get();

                    if (state.balance.amount < amount) return false;

                    set({
                         balance: {
                              id: state.balance.id,
                              amount: state.balance.amount - amount,
                         }
                    });

                    return true;
               },

               saveNft: (nft: INFT) =>
                    set((state) => ({
                         nfts: [...state.nfts, nft],
                    })),

               resetUser: () =>
                    set(() => ({
                         id: `player-none`,
                         username: "Guest",
                         email: "guest@example.com",
                         token: null,
                         avatarNftId: undefined,
                         balance: {
                              id: "smg",
                              amount: 0,
                         },
                         nfts: [],
                         game: { score: 0, rank: 0, playedCount: 0 },
                         createdAt: new Date().toISOString(),
                    })),
          }),
          {
               name: "user-storage",
               partialize: (state) => ({
                    id: state.id,
                    username: state.username,
                    email: state.email,
                    token: state.token,
                    avatarNftId: state.avatarNftId,
                    balance: state.balance,
                    nfts: state.nfts,
                    game: state.game,
                    createdAt: state.createdAt,
               }),
          }
     )
);
