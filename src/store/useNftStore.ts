import { RarityType } from "@/shared/types/filter"
import { create } from "zustand";

type NftRarityType = "all" | "popular" | "new" | "my";

interface INft {
     name: string;
     rarity: RarityType;
     price: number;
     type: NftRarityType;
     image: string;
}

export const NFT_COLLECTION: INft[] = [
     { name: "Extraterrestrial din din madung #4821", rarity: "Legendary", price: 898.45, type: "popular", image: "/nfts/extraterrestrial-din-din-madung-4821.png" },
     { name: "Digital Phantom #7392", rarity: "Rare", price: 112.38, type: "popular", image: "/nfts/digital-phantom-7392.png" },
     { name: "Kirill Barabulka #1205", rarity: "Legendary", price: 201.77, type: "new", image: "/nfts/kirill-barabulka-1205.png" },
     { name: "Cyber Guardian #9451", rarity: "Common", price: 67.12, type: "new", image: "/nfts/cyber-guardian-9451.png" },
     { name: "Neon Soul #3178", rarity: "Epic", price: 144.89, type: "new", image: "/nfts/neon-soul-3178.png" },
     { name: "Quantum Ranger #5823", rarity: "Rare", price: 198.45, type: "popular", image: "/nfts/quantum-ranger-5823.png" },
     { name: "Void Hunter #4709", rarity: "Legendary", price: 230.12, type: "popular", image: "/nfts/void-hunter-4709.png" },
     { name: "Emerald Warrior #8632", rarity: "Common", price: 91.77, type: "new", image: "/nfts/emerald-warrior-8632.png" },
     { name: "Tech Samurai #2951", rarity: "Epic", price: 152.34, type: "new", image: "/nfts/tech-samurai-2951.png" },
     { name: "Cyber Guardian #7284", rarity: "Rare", price: 123.67, type: "new", image: "/nfts/cyber-guardian-7284.png" },
];

interface INftStore {
     nfts: INft[],
     setNfts: (nfts: INft[]) => void,
     addNft: (nft: INft) => void
}

export const useNftStore = create<INftStore>((set) => ({
     nfts: NFT_COLLECTION,
     setNfts: (nfts: INft[]) => set({ nfts }),
     addNft: (nft: INft) => set((state) => ({ nfts: [...state.nfts, nft] }))
}));