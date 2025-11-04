import { create } from "zustand";

export interface INFT {
     id: string;
     name: string;
     image: string;
     description?: string;
     price: number;
     isSellable: boolean;
     ownerId: string;
}

export interface ICurrencyCoin {
     id: string;
     balance: number;
}

export interface IUser {
     id: string;
     username: string;
     email: string;
     token?: string;
     currency: ICurrencyCoin;
     nfts: INFT[];
     avatarNftId?: string;
     game: {
          score: number;
          rank?: number;
     };
     createdAt: string;
     lastLogin?: string;

     /* functions */

     addBalance: (coinId: string, amount: number) => number;
}

export const useUser = create<IUser>((set) => ({
     id: "",
     username: "",
     email: "",
     currency: {
          id: "BTC",
          balance: 150,
     },
     nfts: [
          
     ],
     game: { score: 0, rank: 0 },
     createdAt: new Date().toISOString(),
     addBalance(coinId: string, amount: number) {
          set((state) => {
               if (state.currency.id === coinId) {
                    state.currency.balance += amount;
               }
               return state
          })

          return 0;
     },
     addNft(nft: INFT) {
          set((state) => {
               state.nfts.push(nft);
               return state;
          })
     }
}))