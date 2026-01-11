import { clsx } from "clsx";
import { Check, ShoppingCart } from "lucide-react";
import { RarityType } from "@/shared/types/filter";
import { Button } from "@/shared/ui/Button";
import { firstUpper } from "@/shared/utils/string";
import "./NtfCard.scss";
import { useNftStore } from "@/entities/Nft/model/store";
import { useUserStore } from "@/entities/User/model/store";
import { toast } from "sonner";

interface NftCardProps {
    rarity: RarityType;
    name: string;
    price: number;
    type: string;
    image: string;
    purchased: boolean;
    className?: string;
}

export const NftCard = ({
    rarity,
    name,
    price,
    type,
    image,
    purchased,
    className,
}: NftCardProps) => {
    const handlePurchaseNft = () => {
        const nftStore = useNftStore((s) => s);

        if (purchased) {
            toast.error("You already own this NFT.");
            return;
        }

        const nft = nftStore.getNftByName(name);

        if (!nft) {
            toast.error("NFT not found.");
            return;
        }

        const userStore = useUserStore((s) => s);

        const userBalance = userStore.getBalanceValue(
            userStore.defaultCurrency
        );

        if (userBalance < price) {
            toast.error("Insufficient balance to complete the purchase.");
            return;
        }

        userStore.subBalance(userStore.defaultCurrency, price);
        nftStore.setNftPurchased(nft.name, true);

        toast.success(`Successfully purchased ${nft.name}!`);
    };

    return (
        <div className={clsx(className, "nft-card")}>
            <div className="nft-card__image-wrapper">
                <img src={image} alt={name} className="nft-card__image" />

                {purchased && (
                    <span className="nft-card__purchased-text">
                        <Check width={12} height={12} />
                        Owned
                    </span>
                )}

                <div className="nft-card__info">
                    <span
                        className={clsx(
                            "nft-card__rarity-text",
                            `nft-card__rarity-text--${rarity.toLocaleLowerCase()}`
                        )}
                    >
                        {rarity}
                    </span>
                    <span className="nft-card__type-text">
                        {firstUpper(type)}
                    </span>
                </div>
            </div>
            <div className="nft-card__order">
                <p className="nft-card__name">{name}</p>
                <div className="nft-card__order-wrapper">
                    <div className="nft-card__order-info">
                        <p className="nft-card__label">Price</p>
                        <p className="nft-card__price">
                            {price} <span>SMG</span>
                        </p>
                    </div>
                    <Button
                        disabled={purchased}
                        size="sm"
                        onClick={handlePurchaseNft}
                        className={clsx(
                            "nft-card__acquire-button",
                            purchased && "nft-card__acquire-button--owned"
                        )}
                    >
                        {purchased ? (
                            <Check width={16} />
                        ) : (
                            <ShoppingCart width={16} />
                        )}
                        {purchased ? "Owned" : "Buy"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
