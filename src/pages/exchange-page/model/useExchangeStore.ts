import { create } from "zustand";

type CoinType = "BTC/USDT" | "ETH/USDT" | "SOL/USDT" | "SMG/USDT";
type TradeType = "sell" | "buy";

export interface ICoin {
     type: CoinType;
     name: string;
     price: number;
     change: number;
}

export interface ITradeOrder {
     price: number;
     amount: number;
     total: number;
     type: TradeType;
}

interface IExchangeStore {
     currentCoin: ICoin;
     orders: ITradeOrder[];
     trades: ITradeOrder[];
     setCurrentCoin: (coin: ICoin) => void;
     coins: ICoin[];
     setCoins: (coins: ICoin[]) => void;
}

export const useExchangeStore = create<IExchangeStore>((set) => ({
     currentCoin: { type: "BTC/USDT", name: "BTC", price: 30000, change: 0 },
     coins: [
          { type: "BTC/USDT", name: "BTC", price: 30000, change: 12.7 },
          { type: "ETH/USDT", name: "ETH", price: 2000, change: 0 },
          { type: "SOL/USDT", name: "SOL", price: 40, change: 0 },
          { type: "SMG/USDT", name: "SMG", price: 125, change: 0 },
     ],
     orders: [
          { price: 67437.23, amount: 10.29, total: 102394, type: "buy" },
          { price: 67437.23, amount: 10.29, total: 102394, type: "buy" },
          { price: 67437.23, amount: 10.29, total: 102394, type: "sell" },
          { price: 67437.23, amount: 10.29, total: 102394, type: "sell" },
          { price: 67437.23, amount: 10.29, total: 102394, type: "sell" },
     ],
     trades: [
          { price: 67437.23, amount: 10.29, total: 102394, type: "buy" },
          { price: 67437.23, amount: 10.29, total: 102394, type: "buy" },
          { price: 67437.23, amount: 10.29, total: 102394, type: "sell" },
          { price: 67437.23, amount: 10.29, total: 102394, type: "sell" },
          { price: 67437.23, amount: 10.29, total: 102394, type: "sell" },
     ],

     setCurrentCoin: (coin) => set({ currentCoin: coin }),
     setCoins: (coins) => set({ coins }),
}));
