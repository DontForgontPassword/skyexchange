import BitcoinIcon from "@/shared/assets/icons/bitcoin.png";
import EthereumIcon from "@/shared/assets/icons/ethereum.png";
import SolanaIcon from "@/shared/assets/icons/solana.png";
import SmaragdIcon from "@/shared/assets/icons/smg.png";

import { ICoin, CoinId } from "./types";

export const coinsMap: Record<CoinId, ICoin> = {
    btc: {
        id: "btc",
        icon: BitcoinIcon,
        symbol: "BTC",
        pair: "BTC/USDT",
        name: "Bitcoin",
        price: 30000,
        change: 0,
        rate: 14,
    },
    eth: {
        id: "eth",
        icon: EthereumIcon,
        symbol: "ETH",
        pair: "ETH/USDT",
        name: "Ethereum",
        price: 2000,
        change: 0,
        rate: 14,
    },
    sol: {
        id: "sol",
        icon: SolanaIcon,
        symbol: "SOL",
        pair: "SOL/USDT",
        name: "Solana",
        price: 40,
        change: 0,
        rate: 14,
    },
    smg: {
        id: "smg",
        icon: SmaragdIcon,
        symbol: "SMG",
        pair: "SMG/USDT",
        name: "Smaragd",
        price: 1,
        change: 0,
        rate: 1,
    },
};

export const defaultCoin = coinsMap.btc;

export const coinIds = Object.keys(coinsMap) as CoinId[];
