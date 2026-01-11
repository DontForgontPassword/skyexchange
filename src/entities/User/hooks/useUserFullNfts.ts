import { useUserStore } from "../model/store";
import { useNftStore } from "@/entities/Nft/model/store";
import { INft } from "@/entities/Nft/model/types";

export const useUserFullNfts = (): INft[] => {
    const userNfts = useUserStore((s) => s.nfts);
    const allNfts = useNftStore((s) => s.nfts);

    return userNfts.map((userNft) => {
        const full = allNfts.find((n) => n.id === userNft.id);
        if (!full) return { ...userNft } as INft;

        return { ...full, purchased: true };
    });
};
