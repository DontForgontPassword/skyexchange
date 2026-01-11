import { useNftStore } from "@/entities/Nft/model/store";
import { useUserStore } from "../model/store";

export const useUserTotalNftValue = (): number => {
    const userNfts = useUserStore((s) => s.nfts);
    const allNfts = useNftStore((s) => s.nfts);

    return userNfts.reduce((sum, userNft) => {
        const full = allNfts.find((n) => n.id === userNft.id);
        return full ? sum + full.price : sum;
    }, 0);
};