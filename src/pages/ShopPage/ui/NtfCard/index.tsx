import { rarityType } from "@/shared/types";
import clsx from "clsx";
import { ShoppingCart } from "lucide-react";
import { FC } from "react";
import "./NtfCard.scss";

interface NftCardProps {
     rarity: rarityType,
     name: string;
     price: number;
     className?: string;
}

const NftCard: FC<NftCardProps> = ({
     rarity,
     name,
     price,
     className
}) => {

     const parseRarity = (rarity: rarityType) => {
          return rarity.toLowerCase();
     }

     return (
          <div className={clsx("nft-card", className)}>
               <div className="nft-card__image-wrapper">
                    <img src="/src/assets/images/nft-image.jpg" alt="SkyExchange" className="nft-card__image" />
                    <div className="nft-card__rarity">
                         <span className={clsx("nft-card__rarity-text", `nft-card__rarity-text--${parseRarity(rarity)}`)}>{rarity}</span>
                    </div>
               </div>
               <div className="nft-card__order">
                    <p className="nft-card__name">{name}</p>
                    <div className="nft-card__order-wrapper">
                         <div className="nft-card__order-info">
                              <p className="nft-card__label">Price</p>
                              <span className="nft-card__price">{price} SMG</span>
                         </div>
                         <button className="nft-card__order-purchase-button"><ShoppingCart width={24} height={24} />Buy</button>
                    </div>
               </div>
          </div>
     );
}

export default NftCard;