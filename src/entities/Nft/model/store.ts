import { create } from "zustand";
import { INITIAL_NFT_COLLECTION } from "./constants";
import { INft, NftStore } from "./types";
import { NFT } from "@/entities/User/model/types";

export const useNftStore = create<NftStore>((set, get) => ({
    nfts: INITIAL_NFT_COLLECTION,

    getNftByName: (name: string) => get().nfts.find((nft) => nft.name === name),
    getNftById: (id: string) => get().nfts.find((nft) => nft.id === id),
    setNftPurchased: (name: string, purchased: boolean) =>
        set((state) => ({
            nfts: state.nfts.map((nft) =>
                nft.name === name ? { ...nft, purchased } : nft
            ),
        })),
}));
