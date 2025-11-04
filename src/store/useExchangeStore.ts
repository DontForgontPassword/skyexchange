import { create } from "zustand";

type CoinType = "BTC/USDT" | "ETH/USDT" | "SOL/USDT" | "SMG/USDT";
type TradeType = "sell" | "buy";

export interface ICoin {
     type: CoinType;
     name: string;
     fullName: string;
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
     coins: ICoin[];
     trades: ITradeOrder[];
     orders: ITradeOrder[];

     setCurrentCoin: (coin: ICoin) => void;
     setCoins: (coins: ICoin[]) => void;
     setTrades: (trades: ITradeOrder[]) => void;
     setOrders: (orders: ITradeOrder[]) => void;
     setCoinPrice: (name: string, balance: number) => void;
}

const initialCoins: ICoin[] = [
     { type: "BTC/USDT", name: "BTC", fullName: "Bitcoin", price: 30000, change: 0 },
     { type: "ETH/USDT", name: "ETH", fullName: "Ethereum", price: 2000, change: 0 },
     { type: "SOL/USDT", name: "SOL", fullName: "Solana", price: 40, change: 0 },
     { type: "SMG/USDT", name: "SMG", fullName: "Smaragd", price: 125, change: 0 },
];

export const useExchangeStore = create<IExchangeStore>((set, get) => ({
     currentCoin: initialCoins[0],
     coins: initialCoins,
     orders: [
          { price: 30211.22, amount: 0.153, total: 4622.52, type: "buy" },
          { price: 30102.94, amount: 0.527, total: 15859.25, type: "sell" },
          { price: 30084.65, amount: 0.847, total: 25462.1, type: "buy" },
          { price: 30255.43, amount: 0.112, total: 3390.6, type: "sell" },
          { price: 29998.76, amount: 1.532, total: 45945.3, type: "buy" },
          { price: 30175.23, amount: 0.342, total: 10399.86, type: "sell" },
          { price: 30288.19, amount: 0.642, total: 19452.12, type: "sell" },
          { price: 30032.48, amount: 0.913, total: 27419.6, type: "buy" },
          { price: 30321.12, amount: 0.124, total: 3760.6, type: "buy" },
          { price: 29975.88, amount: 0.734, total: 21988.2, type: "sell" },
     ],

     trades: [
          { price: 30145.65, amount: 0.245, total: 7385.7, type: "buy" },
          { price: 30098.23, amount: 0.612, total: 18480.1, type: "sell" },
          { price: 30204.77, amount: 0.132, total: 3987.03, type: "buy" },
          { price: 30178.12, amount: 0.478, total: 14425.7, type: "buy" },
          { price: 29984.55, amount: 0.854, total: 25623.9, type: "sell" },
          { price: 30102.11, amount: 0.621, total: 18666.3, type: "sell" },
          { price: 30234.88, amount: 0.189, total: 5714.4, type: "buy" },
          { price: 30155.94, amount: 0.954, total: 28761.2, type: "sell" },
          { price: 30011.64, amount: 0.423, total: 12649.9, type: "buy" },
          { price: 30302.47, amount: 0.311, total: 9424.05, type: "sell" },
     ],

     setCurrentCoin: (coin) => set({ currentCoin: coin }),
     setCoins: (coins) => set({ coins }),
     setTrades: (trades) => set({ trades }),
     setOrders: (orders) => set({ orders }),
     setCoinPrice: (name, price) => {
          set((state) => ({
               coins: state.coins.map((coin) =>
                    coin.name === name ? { ...coin, price } : coin
               ),
          }));
     },
}));
