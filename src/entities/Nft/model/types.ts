import { RarityType } from "@/shared/types/filter";

export type NftRarityType = "all" | "popular" | "new" | "my";

export interface INft {
    id: string;
    name: string;
    rarity: RarityType;
    price: number;
    type: NftRarityType;
    image: string;
    purchased?: boolean;
}

export interface NftStore {
    nfts: INft[];
    getNftByName: (name: string) => INft | undefined;
    getNftById: (id: string) => INft | undefined;
    setNftPurchased: (name: string, purchased: boolean) => void;
}
