import { NFT } from "@/features/nft/model/types";

export type Balance = {
    amount: number;
    id: string;
};

export type User = {
    id: number;
    email: string;
    username: string;
    avatarImage: string | null;
    balances: Record<string, number>;
    nfts: NFT[];
    game: {
        score: number;
        rank: number;
    };
    createdAt: string;
};
