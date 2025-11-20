import { useState } from "react";
import clsx from "clsx";
import "./ShopPage.scss";
import { Funnel } from "lucide-react";
import { RARITY_FILTERS, SHOP_FILTERS, ShopFilterType, ShopRarityFilterType } from "@/shared/constants/Shop";
import AddFundsModal from "@/widgets/add-funds-modal/AddFundsModal";
import { useNftStore } from "@/shared/store/useNftStore";
import NftCard from "@/features/nft-card/NftCard";
import InfoCard from "@/features/info-card/InfoCard";
import { useUser } from "@/shared/store/useUser";
import Button from "@/shared/ui/button/Button";

export const ShopPage = () => {
     const [currentFilter, setCurrentFilter] = useState<ShopFilterType>("all");
     const [currentRarity, setCurrentRarity] = useState<ShopRarityFilterType>("all");
     const [isFundsModalOpen, setFundsModalOpen] = useState(false);

     const userNfts = useUser((s) => s.nfts);
     const nfts = useNftStore((s) => s.nfts);

     const userNftNames = new Set(userNfts.map((nft) => nft.name))

     const filteredNfts = nfts
          .filter(nft => {
               switch (currentFilter) {
                    case "all":
                         return true
                         break;
                    case "popular":
                         return nft.type === "popular"
                         break;
                    case "new":
                         return nft.type === "new"
                         break;
                    case "my":
                         return userNftNames.has(nft.name);
                    default:
                         return true;
               }
          })
          .filter(nft => currentRarity === "all" || nft.rarity.toLowerCase() === currentRarity);

     const sortedNfts = filteredNfts.sort((a, b) => a.price - b.price);

     return (
          <>
               {
                    isFundsModalOpen && <AddFundsModal setFundsModalOpen={setFundsModalOpen} />
               }
               <section className="shop-page">
                    <div className="shop-page__container container">
                         <div className="shop-page__wrapper">
                              <div className="shop-page__header">
                                   {SHOP_FILTERS.map((filter) => (
                                        <Button
                                             key={filter.type}
                                             onClick={() => setCurrentFilter(filter.type)}
                                             className={clsx(
                                                  "shop-page__header-button",
                                                  currentFilter === filter.type && "shop-page__header-button--active"
                                             )}
                                             color={""}
                                             size="md">
                                             {filter.label}
                                        </Button>
                                   ))}
                              </div>

                              <div className="shop-page__filter-card">
                                   <div className="shop-page__filter-card-title">
                                        <Funnel className="shop-page__filter-icon" width={12} height={12} />
                                        <p className="primary-text">Filter by Rarity</p>
                                   </div>
                                   <div className="shop-page__filter-card-buttons">
                                        {RARITY_FILTERS.map((filter) => (
                                             <Button
                                                  key={filter.type}
                                                  className={clsx(
                                                       "shop-page__filter-button",
                                                       `shop-page__filter-button--${filter.type}`,
                                                       currentRarity === filter.type && "shop-page__filter-button--active"
                                                  )}
                                                  variant="secondary"
                                                  onClick={() => setCurrentRarity(filter.type)}>
                                                  {filter.label}
                                             </Button>
                                        ))}
                                   </div>
                              </div>

                              <div className="shop-page__cards">
                                   {
                                        sortedNfts.map((nft) => {
                                             return (
                                                  <NftCard
                                                       key={nft.name}
                                                       name={nft.name}
                                                       price={nft.price}
                                                       rarity={nft.rarity}
                                                       type={nft.type}
                                                       image={nft.image}
                                                       purchased={userNftNames.has(nft.name)}
                                                  />
                                             )
                                        })
                                   }
                              </div>
                         </div>

                         <aside className="shop-page__sidebar">
                              <InfoCard setFundsModalOpen={setFundsModalOpen} />
                         </aside>
                    </div>
               </section>
          </>
     );
};