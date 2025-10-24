import type { ITradingPair } from "@/shared/contexts/ServerContext";

const Trading: ITradingPair[] = [
     {
          type: "bitcoin",
          name: "BTC/USDT",
          price: 67123.23,
          change: 24.45
     },
     {
          type: "ethereum",
          name: "ETH/USDT",
          price: 1943.23,
          change: -94.45
     },
     {
          type: "solana",
          name: "SOL/USDT",
          price: 203.23,
          change: 1.25
     },
     {
          type: "smaragd",
          name: "SMG/USDT",
          price: 495.23,
          change: 5.98
     }
];

export default Trading;