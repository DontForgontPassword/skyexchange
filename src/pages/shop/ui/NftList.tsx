import { useAppSelector } from "@/app/provider";
import { NftCard } from "@/entities/nft";
import { usePerformPurchaseNftMutation } from "@/features/shop";
import { Nft } from "@/shared/model";
import { toast } from "sonner";
import "./NftList.scss";

interface NftListProps {
    nfts: Nft[];
}

export const NftList = ({ nfts }: NftListProps) => {
    const isAuthorized = useAppSelector((state) => state.auth.isAuthenticated);

    const [purchase, { isLoading }] = usePerformPurchaseNftMutation();

    const handlePurchase = async (nftId: number) => {
        if (!isAuthorized) {
            return;
        }

        if (isLoading) {
            return;
        }

        try {
            const purchaseResponse = await purchase(nftId).unwrap();

            if (!purchaseResponse.success) {
                toast.error(purchaseResponse.message);
            } else {
                toast.success(purchaseResponse.message);
            }
        } catch (e) {
            console.error(`[NftList]: ${e}`);
        }
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
