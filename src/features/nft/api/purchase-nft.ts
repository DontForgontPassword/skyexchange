import { api } from "@/shared/api";

export const purchaseNft = async (nftId: number) => {
    return api.post(`/api/shop/purchase`, {
        nftId,
    });
};
