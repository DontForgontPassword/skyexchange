import { api } from "@/shared/api";
import { NFT } from "../model/types";

export const getNfts = async (): Promise<NFT[]> => {
    return api.get("api/shop/nfts").then((res) => res.data);
};
