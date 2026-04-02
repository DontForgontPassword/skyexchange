import { clsx } from "clsx";
import { Check, ShoppingCart } from "lucide-react";
import { RarityType } from "@/shared/types/filter";
import { Button } from "@/shared/ui/Button";
import { firstUpper } from "@/shared/lib/string";
import { BASE_URL } from "@/shared/config/Server";
import "./nft-card.scss";

interface NftCardProps {
    id: number;
    name: string;
    image: string;
    price: number;
    rarity: RarityType;
    type: string;
    purchased: boolean;
    isAuthorized: boolean;
    onPurchase: (nftId: number) => void;
    className?: string;
}

export const NftCard = ({
    id,
    name,
    image,
    price,
    rarity,
    type,
    purchased,
    isAuthorized,
    onPurchase,
    className,
}: NftCardProps) => {
    return (
        <div className={clsx(className, "nft-card")}>
            <div className="nft-card__image-wrapper">
                <img
                    src={`${BASE_URL}${image}`}
                    alt={name}
                    className="nft-card__image"
                />

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
                            `nft-card__rarity-text--${rarity.toLowerCase()}`,
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
                        onClick={() => onPurchase(id)}
                        className={clsx(
                            "nft-card__acquire-button",
                            purchased && "nft-card__acquire-button--owned",
                        )}
                    >
                        {purchased ? (
                            <Check width={16} />
                        ) : (
                            <ShoppingCart width={16} />
                        )}
                        {purchased
                            ? "Owned"
                            : isAuthorized
                              ? "Buy"
                              : "Auth to buy"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
