import { Nft } from "@/shared/model";

export type User = {
    id: number;
    email: string;
    username: string;
    avatarImage: string | null;
    balances: Record<string, { value: number; name: string }>;
    nfts: Nft[];
    game: {
        score: number;
        rank: number;
    };
    createdAt: string;
};
