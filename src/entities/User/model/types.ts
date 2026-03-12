export interface NFT {
  id: number;
  name: string;
}

export enum Currency {
  BTC = "btc",
  ETH = "eth",
  SOL = "sol",
  SMG = "smg",
}

export interface Game {
  score: number;
  rank: number;
}

export interface Balance {
  currency: Currency;
  value: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  token?: string | null;
  avatarImage?: string | null;

  balances: Balance[];
  defaultCurrency: Currency;
  nfts: NFT[];
  game: Game;
  createdAt: string;
}