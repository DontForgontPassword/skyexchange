import { RarityType } from "../types/filter";

export type ShopFilterType = "all" | "popular" | "new" | "my";
export type ShopRarityFilterType = "all" | "legendary" | "epic" | "rare" | "common";

interface IShopFilter {
     label: string;
     type: ShopFilterType;
}

interface IShopRarityFilter {
     label: string;
     type: ShopRarityFilterType;
}

interface INft {
     name: string;
     rarity: RarityType;
     price: number;
     type: ShopFilterType;
}

export const SHOP_FILTERS: IShopFilter[] = [
     { label: "All", type: "all" },
     { label: "Popular", type: "popular" },
     { label: "New", type: "new" },
     { label: "My NFTs", type: "my" },
];

export const RARITY_FILTERS: IShopRarityFilter[] = [
     { label: "All", type: "all" },
     { label: "Legendary", type: "legendary" },
     { label: "Epic", type: "epic" },
     { label: "Rare", type: "rare" },
     { label: "Common", type: "common" },
];

export const NFT_COLLECTION: INft[] = [
     { name: "Tech Samurai #4821", rarity: "Epic", price: 178.45, type: "popular" },
     { name: "Digital Phantom #7392", rarity: "Rare", price: 112.38, type: "popular" },
     { name: "Emerald Knight #1205", rarity: "Legendary", price: 201.77, type: "new" },
     { name: "Cyber Guardian #9451", rarity: "Common", price: 67.12, type: "new" },
     { name: "Neon Soul #3178", rarity: "Epic", price: 144.89, type: "new" },
     { name: "Quantum Ranger #5823", rarity: "Rare", price: 198.45, type: "popular" },
     { name: "Void Hunter #4709", rarity: "Legendary", price: 230.12, type: "popular" },
     { name: "Emerald Warrior #8632", rarity: "Common", price: 91.77, type: "new" },
     { name: "Tech Samurai #2951", rarity: "Epic", price: 152.34, type: "new" },
     { name: "Cyber Guardian #7284", rarity: "Rare", price: 123.67, type: "new" },
];