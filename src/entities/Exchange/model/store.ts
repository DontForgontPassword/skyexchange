import { create } from "zustand";
import { getStorage, setStorage } from "@/shared/lib/localStorage";

import { ICoin, ITradeOrder, CoinId } from "./types";
import { coinsMap, coinIds } from "./constants";
import { getRandomPrice } from "./lib";

interface IExchangeStore {
    currentCoinId: CoinId;

    coins: Record<CoinId, ICoin>;
    trades: ITradeOrder[];
    orders: ITradeOrder[];

    setCurrentCoin: (id: CoinId) => void;
    getCoin: (id: CoinId) => ICoin;

    setCoinPrice: (id: CoinId, price: number) => void;
    updatePrices: () => void;
}

const persistedCoins = coinsMap;

export const useExchangeStore = create<IExchangeStore>((set, get) => ({
    currentCoinId: "btc",

    coins: persistedCoins,
    trades: getStorage<ITradeOrder[]>("trades", [])!,
    orders: getStorage<ITradeOrder[]>("orders", [])!,

    setCurrentCoin: (id) => set({ currentCoinId: id }),

    getCoin: (id) => get().coins[id],

    setCoinPrice: (id, price) =>
        set((state) => ({
            coins: {
                ...state.coins,
                [id]: {
                    ...state.coins[id],
                    price,
                },
            },
        })),

    updatePrices: () =>
        set((state) => {
            const updatedCoins = { ...state.coins };

            for (const id of coinIds) {
                const coin = updatedCoins[id];
                const newPrice = getRandomPrice(coin.price);

                updatedCoins[id] = {
                    ...coin,
                    price: newPrice,
                    change: Number((newPrice - coin.price).toFixed(2)),
                };
            }

            setStorage("coins", updatedCoins);
            return { coins: updatedCoins };
        }),
}));
