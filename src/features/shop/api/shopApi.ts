import { baseApi } from "@/shared/api";
import { Nft } from "@/shared/model";
import { NftPurchaseResponse } from "./types";

const nftApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNfts: builder.query<Nft[], void>({
            query: () => "/shop/nfts",
            providesTags: ["NFT"],
        }),
        performPurchaseNft: builder.mutation<NftPurchaseResponse, number>({
            query: (nftId) => ({
                url: "/shop/purchase",
                method: "POST",
                body: { nft_id: nftId },
            }),
            invalidatesTags: ["NFT", "Balance", "User"],
        }),
    }),
});

export const { useGetNftsQuery, usePerformPurchaseNftMutation } = nftApi;
