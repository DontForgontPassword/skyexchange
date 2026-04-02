import { NftCard } from "@/entities/nft";
import { useAuthStore } from "@/features/auth";
import { purchaseNft } from "@/features/nft";
import { Nft } from "@/shared/types/nfts";

interface NftListProps {
    nfts: Nft[];
}

export const NftList = ({ nfts }: NftListProps) => {
    const isAuthorized = useAuthStore((state) => state.accessToken !== null);

    const handlePurchase = (nftId: number) => {
        if (!isAuthorized) {
            alert("Please log in to purchase NFTs.");
            return;
        }
        purchaseNft(nftId);
    };

    return (
        <>
            {nfts.map((nft) => (
                <NftCard
                    key={nft.id}
                    id={nft.id}
                    name={nft.name}
                    image={nft.image}
                    price={nft.price}
                    rarity={nft.rarity}
                    type={nft.type}
                    purchased={nft.purchased}
                    isAuthorized={isAuthorized}
                    onPurchase={handlePurchase}
                />
            ))}
        </>
    );
};
