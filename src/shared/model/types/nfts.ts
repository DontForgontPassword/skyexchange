import { RarityType } from "@/shared/model/types";

export interface Nft {
    id: number;
    name: string;
    price: number;
    rarity: RarityType;
    type: string;
    image: string;
    purchased: boolean;
}
