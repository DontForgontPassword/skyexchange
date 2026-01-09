import { create } from 'zustand';

import BitcoinIcon from '@/shared/assets/icons/bitcoin.png';
import EthereumIcon from '@/shared/assets/icons/ethereum.png';
import SmaragdIcon from '@/shared/assets/icons/smg.png';
import SolanaIcon from '@/shared/assets/icons/solana.png';
import { getStorage, setStorage } from '@/shared/utils/localStorage';

type CoinType = 'BTC/USDT' | 'ETH/USDT' | 'SOL/USDT' | 'SMG/USDT';
type TradeType = 'sell' | 'buy';

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
    getCoinByName: (name: string) => ICoin | undefined;
    update: () => void;
}

const initialCoins: ICoin[] = [
    {
        icon: BitcoinIcon,
        type: 'BTC/USDT',
        name: 'BTC',
        fullName: 'Bitcoin',
        price: 30000,
        change: 0,
        rate: 14,
    },
    {
        icon: EthereumIcon,
        type: 'ETH/USDT',
        name: 'ETH',
        fullName: 'Ethereum',
        price: 2000,
        change: 0,
        rate: 14,
    },
    {
        icon: SolanaIcon,
        type: 'SOL/USDT',
        name: 'SOL',
        fullName: 'Solana',
        price: 40,
        change: 0,
        rate: 14,
    },
    {
        icon: SmaragdIcon,
        type: 'SMG/USDT',
        name: 'SMG',
        fullName: 'Smaragd',
        price: 125,
        change: 0,
        rate: 14,
    },
];

const persistedCoins = getStorage<ICoin[]>('coins', null);
const persistedTrades = getStorage<ITradeOrder[]>('trades', null);
const persistedOrders = getStorage<ITradeOrder[]>('orders', null);

const getRandomPrice = (currentPrice: number) => {
    const fluctuation = (Math.random() * 0.1 - 0.05);
    const newPrice = currentPrice * (1 + fluctuation);
    return parseFloat(newPrice.toFixed(2));
};

export const useExchangeStore = create<IExchangeStore>((set, get) => ({
    currentCoin: initialCoins[0],
    coins: persistedCoins || initialCoins,
    orders: persistedOrders || [
        {
            amount: 12,
            coin: 'BTC',
            price: 999,
            total: 1.43,
            type: 'buy',
        },
        {
            amount: 12,
            coin: 'BTC',
            price: 999,
            total: 1.43,
            type: 'buy',
        },
        {
            amount: 12,
            coin: 'SOL',
            price: 999,
            total: 1.43,
            type: 'sell',
        },
    ],
    trades: persistedTrades || [
        {
            amount: 12,
            coin: 'BTC',
            price: 999,
            total: 1.43,
            type: 'buy',
        },
        {
            amount: 12,
            coin: 'BTC',
            price: 999,
            total: 1.43,
            type: 'buy',
        },
        {
            amount: 12,
            coin: 'SOL',
            price: 999,
            total: 1.43,
            type: 'sell',
        },
    ],

    setCurrentCoin: (coin) => set({ currentCoin: coin }),
    setCoins: (coins) => {
        setStorage('coins', coins);
        set({ coins });
    },
    setTrades: (trades) => {
        setStorage('trades', trades);
        set({ trades });
    },
    setOrders: (orders) => {
        setStorage('orders', orders);
        set({ orders });
    },
    setCoinPrice: (name, price) => {
        set((state) => ({
            coins: state.coins.map((coin) =>
                coin.name === name ? { ...coin, price } : coin,
            ),
        }));
    },
    getCoinByName: (name: string) =>
        get().coins.find((coin) => coin.name === name),
    update: () => {
        set((state) => {
            const updatedCoins = state.coins.map((coin) => {
                const newPrice = getRandomPrice(coin.price);
                return {
                    ...coin,
                    price: newPrice,
                    change: parseFloat((newPrice - coin.price).toFixed(2)),
                };
            });
            setStorage('coins', updatedCoins);

            return { coins: updatedCoins };
        });
    }

}));
