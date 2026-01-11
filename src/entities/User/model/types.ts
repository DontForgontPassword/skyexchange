export type Currency = "btc" | "eth" | "sol" | "smg";

export interface Balance {
    value: number;
    name: string;
}

export interface NFT {
    id: string;
    name: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    token: string | null;
    avatarImage: string | null;
    balances: Record<Currency, Balance>;
    defaultCurrency: Currency;
    nfts: NFT[];
    game: {
        score: number;
        rank: number;
    };
    createdAt: string;
}

export interface UserState extends User {
    setAvatar: (image: string) => void;
    addNFT: (nft: NFT) => void;

    /* auth */
    reset: () => void;
    register: (username: string, email: string, password: string) => void;

    /* balance */
    getBalance: (currency: Currency) => Balance;
    getBalanceValue: (currency: Currency) => number;

    getDefaultBalance: () => Balance;
    getDefaultBalanceValue: () => number;

    subBalance: (currency: Currency, value: number) => void;
    addBalance: (currency: Currency, value: number) => void;
}
