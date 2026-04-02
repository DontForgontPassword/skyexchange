import { RarityType } from "@/shared/types";

export type NFT = {
    id: number;
    image: string;
    name: string;
    price: number;
    rarity: RarityType;
    type: string;
    purchased: boolean;
};
