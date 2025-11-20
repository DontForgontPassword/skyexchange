import clsx from "clsx";
import { Check, ShoppingCart } from "lucide-react";
import { FC, useEffect } from "react";
import "./NtfCard.scss";
import { firstUpper } from "@/shared/utils/string";
import { RarityType } from "@/shared/types/filter";
import { toast } from "sonner";
import { useUser } from "@/shared/store/useUser";
import { useNftStore } from "@/shared/store/useNftStore";
import Button from "@/shared/ui/button/Button";
import { useNavigate } from "react-router-dom";

interface NftCardProps {
     rarity: RarityType,
     name: string;
     price: number;
     type: string;
     image: string;
     purchased: boolean;
     className?: string;
}

const NftCard: FC<NftCardProps> = ({
     rarity,
     name,
     price,
     type,
     image,
     purchased,
     className
}) => {
     const nfts = useNftStore();
     const user = useUser();
     const navigate = useNavigate();

     const parseRarity = (rarity: RarityType) => {
          return rarity.toLowerCase();
     }

     const handlePurchaseNft = () => {
          if (!user.token) {
               toast.error("Please sign in to purchase NFTs");
               return navigate("/login")
          }

          if (price <= user.balance.amount) {
               nfts.setPurchased(name, true);
               user.removeBalance(price);
               user.saveNft({
                    id: crypto.randomUUID(),
                    image,
                    name,
                    price,
                    isSellable: true,
                    ownerId: user.id,
               });
               toast.success(`Successfully purchased ${name}`)
          }
          else toast.error(`Insufficient funds. You need ${(price - user.balance.amount).toFixed(2)} more`)
     }

     useEffect(() => {
          console.log("purchased", purchased);
     }, [purchased]);

     return (
          <div className={clsx("nft-card", className)}>
               <div className="nft-card__image-wrapper">
                    <img src={image} alt={name} className="nft-card__image" />

                    {purchased && <span className="nft-card__purchased-text"><Check width={12} height={12} />Owned</span>}

                    <div className="nft-card__info">
                         <span
                              className={clsx(
                                   "nft-card__rarity-text",
                                   `nft-card__rarity-text--${parseRarity(rarity)}`
                              )}
                         >
                              {rarity}
                         </span>
                         <span className="nft-card__type-text">{firstUpper(type)}</span>
                    </div>
               </div>
               <div className="nft-card__order">
                    <p className="nft-card__name">{name}</p>
                    <div className="nft-card__order-wrapper">
                         <div className="nft-card__order-info">
                              <p className="nft-card__label">Price</p>
                              <span className="nft-card__price">{price} SMG</span>
                         </div>
                         <Button
                              disabled={purchased}
                              size="sm"
                              onClick={handlePurchaseNft}
                              className={clsx("nft-card__card-purchase-button", purchased && "nft-card__card-purchase-button--owned")}
                         >
                              {
                                   purchased ? <Check width={16} /> : <ShoppingCart width={16} />
                              }
                              {
                                   purchased ? "Owned" : "Buy"
                              }
                         </Button>
                    </div>
               </div>
          </div>
     );
}

export default NftCard;