import clsx from "clsx";
import { ShoppingCart } from "lucide-react";
import { FC } from "react";
import "./NtfCard.scss";
import { firstUpper } from "@/shared/utils/string";
import { RarityType } from "@/shared/types";

interface NftCardProps {
     rarity: RarityType,
     name: string;
     price: number;
     type: string;
     className?: string;
}

const NftCard: FC<NftCardProps> = ({
     rarity,
     name,
     price,
     type,
     className
}) => {

     const parseRarity = (rarity: RarityType) => {
          return rarity.toLowerCase();
     }

     return (
          <div className={clsx("nft-card", className)}>
               <div className="nft-card__image-wrapper">
                    <img src="/src/assets/images/nft-image.jpg" alt="SkyExchange" className="nft-card__image" />
                    <div className="nft-card__info">
                         <span className={clsx("nft-card__rarity-text", `nft-card__rarity-text--${parseRarity(rarity)}`)}>{rarity}</span>
                         <span className={clsx("nft-card__type-text")}>{firstUpper(type)}</span>
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