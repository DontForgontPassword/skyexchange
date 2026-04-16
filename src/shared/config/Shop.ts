type ShopFilterType = "all" | "popular" | "new" | "my";
type ShopRarityFilterType = "all" | "legendary" | "epic" | "rare" | "common";

type ShopFilter = {
    label: string;
    type: ShopFilterType;
}

type ShopRarityFilter = {
    label: string;
    type: ShopRarityFilterType;
}

const SHOP_FILTERS: ShopFilter[] = [
    { label: "All", type: "all" },
    { label: "Popular", type: "popular" },
    { label: "New", type: "new" },
    { label: "My NFTs", type: "my" },
];

const RARITY_FILTERS: ShopRarityFilter[] = [
    { label: "All", type: "all" },
    { label: "Legendary", type: "legendary" },
    { label: "Epic", type: "epic" },
    { label: "Rare", type: "rare" },
    { label: "Common", type: "common" },
];

export { SHOP_FILTERS, RARITY_FILTERS };
export type { ShopFilterType, ShopRarityFilterType };
