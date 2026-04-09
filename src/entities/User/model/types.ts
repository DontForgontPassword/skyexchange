export type User = {
    id: number;
    email: string;
    username: string;
    avatarImage: string | null;
    balances: Record<string, number>;
    nfts: [];
    game: {
        score: number;
        rank: number;
    };
    createdAt: string;
};
