import { create } from 'zustand';

import beeChlen from '@/shared/assets/images/nfts/bee-chlen-218.jpg';
import cockGuardian from '@/shared/assets/images/nfts/cocal-guardian-3443.jpg';
import kitIgor from '@/shared/assets/images/nfts/cyber-guardian-7284.jpg';
import cyberGuardian from '@/shared/assets/images/nfts/cyber-guardian-9451.png';
import digitalPhantom from '@/shared/assets/images/nfts/digital-phantom-7392.png';
import extraterrestrial from '@/shared/assets/images/nfts/extraterrestrial-din-din-madung-4821.png';
import femboiWarrior from '@/shared/assets/images/nfts/femboi-warrior-8632.png';
import kirillBarabulka from '@/shared/assets/images/nfts/kirill-barabulka-1205.png';
import ladyGaga from '@/shared/assets/images/nfts/lady-gaga-4353.jpg';
import neonSoul from '@/shared/assets/images/nfts/neon-soul-3178.png';
import quantumRanger from '@/shared/assets/images/nfts/quantum-ranger-5823.png';
import olga from '@/shared/assets/images/nfts/void-hunter-4709.png';
import { RarityType } from '@/shared/types/filter';
import { INFT } from './useUser';

type NftRarityType = 'all' | 'popular' | 'new' | 'my';

interface INft {
    name: string;
    rarity: RarityType;
    price: number;
    type: NftRarityType;
    image: string;
    purchased?: boolean;
}

const NFT_COLLECTION: INft[] = [
    {
        name: 'Extraterrestrial din din madung #4821',
        rarity: 'Legendary',
        price: 898.45,
        type: 'popular',
        image: extraterrestrial,
    },
    {
        name: 'Samurai Mashka #7392',
        rarity: 'Rare',
        price: 112.38,
        type: 'popular',
        image: digitalPhantom,
    },
    {
        name: 'Kirill Barabulka #1205',
        rarity: 'Legendary',
        price: 201.77,
        type: 'new',
        image: kirillBarabulka,
    },
    {
        name: 'Kazah Level Up Super Ultra Max #9451',
        rarity: 'Common',
        price: 67.12,
        type: 'new',
        image: cyberGuardian,
    },
    {
        name: 'Chicken Nuggets #3178',
        rarity: 'Epic',
        price: 144.89,
        type: 'new',
        image: neonSoul,
    },
    {
        name: 'Quantum Ranger #5823',
        rarity: 'Rare',
        price: 198.45,
        type: 'popular',
        image: quantumRanger,
    },
    {
        name: 'Olga #4709',
        rarity: 'Legendary',
        price: 230.12,
        type: 'popular',
        image: olga,
    },
    {
        name: 'Femboi Warrior #8632',
        rarity: 'Common',
        price: 91.77,
        type: 'new',
        image: femboiWarrior,
    },
    {
        name: 'Bee chlen #218',
        rarity: 'Epic',
        price: 152.34,
        type: 'popular',
        image: beeChlen,
    },
    {
        name: 'Kit Igor #7284',
        rarity: 'Legendary',
        price: 123.67,
        type: 'new',
        image: kitIgor,
    },
    {
        name: 'Cock Guardian #3443',
        rarity: 'Legendary',
        price: 1222.67,
        type: 'new',
        image: cockGuardian,
    },
    {
        name: 'Lady Gaga #4353',
        rarity: 'Legendary',
        price: 543.67,
        type: 'new',
        image: ladyGaga,
    },
];
interface INftStore {
    nfts: INft[];
    setNfts: (nfts: INft[]) => void;
    addNft: (nft: INft) => void;
    setPurchased: (name: string, purchased: boolean) => void;
    getCost: (name: string | Array<INFT>) => number;
}

export const useNftStore = create<INftStore>((set) => ({
    nfts: NFT_COLLECTION,
    setNfts: (nfts) => set({ nfts }),
    addNft: (nft) => set((state) => ({ nfts: [...state.nfts, nft] })),
    setPurchased: (name, purchased) =>
        set((state) => ({
            nfts: state.nfts.map((nft) =>
                nft.name === name ? { ...nft, purchased } : nft,
            ),
        })),
    getCost: (name) => {
        if (Array.isArray(name)) {
            return name.reduce((total, nft) => {
                const nftItem = NFT_COLLECTION.find((nftItem) => nftItem.name === nft.name);
                return total + (nftItem ? nftItem.price : 0);
            }, 0);
        }
        const nft = NFT_COLLECTION.find((nft) => nft.name === name);
        return nft ? nft.price : 0;
    },
}));
