
export type ShopFilterType = 'all' | 'popular' | 'new' | 'my';
export type ShopRarityFilterType = 'all' | 'legendary' | 'epic' | 'rare' | 'common';

interface IShopFilter {
     label: string;
     type: ShopFilterType;
}

interface IShopRarityFilter {
     label: string;
     type: ShopRarityFilterType;
}

export const SHOP_FILTERS: IShopFilter[] = [
     { label: 'All', type: 'all' },
     { label: 'Popular', type: 'popular' },
     { label: 'New', type: 'new' },
     { label: 'My NFTs', type: 'my' },
]

export const RARITY_FILTERS: IShopRarityFilter[] = [
     { label: 'All', type: 'all' },
     { label: 'Legendary', type: 'legendary' },
     { label: 'Epic', type: 'epic' },
     { label: 'Rare', type: 'rare' },
     { label: 'Common', type: 'common' },
]


