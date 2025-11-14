import { create } from "zustand";
import { getStorage, setStorage } from "@/shared/utils/localStorage";
import { useUser } from "./useUser";

import BitcoinIcon from "@/shared/assets/icons/bitcoin.svg";
import EthereumIcon from "@/shared/assets/icons/ethereum.svg";
import SolanaIcon from "@/shared/assets/icons/solana.svg";

type CoinType = "BTC/USDT" | "ETH/USDT" | "SOL/USDT" | "SMG/USDT";
type TradeType = "sell" | "buy";

export interface ICoin {
     icon: string;
     type: CoinType;
     name: string;
     fullName: string;
     price: number;
     change: number;
     rate: number;
}

export interface ITradeOrder {
     coin: string;
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
     setCoinPrice: (name: string, price: number) => void;

     buyCoin: (coinName: string, price: number, amount: number) => boolean;
}

const initialCoins: ICoin[] = [
     { icon: BitcoinIcon, type: "BTC/USDT", name: "BTC", fullName: "Bitcoin", price: 30000, change: 0, rate: 0 },
     { icon: EthereumIcon, type: "ETH/USDT", name: "ETH", fullName: "Ethereum", price: 2000, change: 0, rate: 0 },
     { icon: SolanaIcon, type: "SOL/USDT", name: "SOL", fullName: "Solana", price: 40, change: 0, rate: 0 },
     { icon: SolanaIcon, type: "SMG/USDT", name: "SMG", fullName: "Smaragd", price: 125, change: 0, rate: 0 },
];

const persistedCoins = getStorage<ICoin[]>("coins", null);
const persistedTrades = getStorage<ITradeOrder[]>("trades", null);
const persistedOrders = getStorage<ITradeOrder[]>("orders", null);

export const useExchangeStore = create<IExchangeStore>((set, get) => ({
     currentCoin: initialCoins[0],
     coins: persistedCoins || initialCoins,
     orders: persistedOrders || [],
     trades: persistedTrades || [],

     setCurrentCoin: (coin) => set({ currentCoin: coin }),
     setCoins: (coins) => {
          setStorage("coins", coins);
          set({ coins });
     },
     setTrades: (trades) => {
          setStorage("trades", trades);
          set({ trades });
     },
     setOrders: (orders) => {
          setStorage("orders", orders);
          set({ orders });
     },
     setCoinPrice: (name, price) => {
          set((state) => ({
               coins: state.coins.map((coin) => (coin.name === name ? { ...coin, price } : coin)),
          }));
     },
     buyCoin: (coinName, price, amount) => {
          const total = price * amount;
          const user = useUser.getState();
          if (total > user.balance) return false;

          const coin = get().coins.find((c) => c.name === coinName);
          if (!coin) return false;

          set((state) => {
               const trade: ITradeOrder = { coin: coinName, price, amount, total, type: "buy" };
               const trades = [trade, ...state.trades].slice(0, 500);
               setStorage("trades", trades);
               return { trades };
          });

          return true;
     },
}));