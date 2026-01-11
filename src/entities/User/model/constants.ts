import { User } from "./types";

export const DEFAULT_BALANCES: User["balances"] = {
    btc: { value: 0, name: "Bitcoin" },
    eth: { value: 0, name: "Ethereum" },
    sol: { value: 0, name: "Solana" },
    smg: { value: 100000, name: "SMG Coins" },
};

export const GUEST_USER = {
    id: "guest",
    username: "Guest",
    email: "guest@mail.com",
    token: null,
    avatarImage: null,
    balances: DEFAULT_BALANCES,
    defaultCurrency: "smg",
    nfts: [],
    game: { score: 0, rank: 0 },
    createdAt: "",
} satisfies User;
