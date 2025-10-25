import { useState } from "react";
import clsx from "clsx";
import "./ShopPage.scss";
import NftCard from "./ui/NtfCard";
import InfoCard from "./ui/InfoCard";
import { Funnel } from "lucide-react";
import { NFT_COLLECTION } from "@/shared/constants";
import { RARITY_FILTERS, SHOP_FILTERS, ShopFilterType, ShopRarityFilterType } from "@/shared/constants/Shop.constants";

const ShopPage = () => {
     const [currentFilter, setCurrentFilter] = useState<ShopFilterType>("all");
     const [currentRarity, setCurrentRarity] = useState<ShopRarityFilterType>("all");

     const filteredNfts = NFT_COLLECTION
          .filter(nft => currentFilter === "all" || nft.type === currentFilter)
          .filter(nft => currentRarity === "all" || nft.rarity.toLowerCase() === currentRarity);

     const sortedNfts = filteredNfts.sort((a, b) => a.price - b.price);

     return (
          <section className="shop-page">
               <div className="shop-page__container container">
                    <div className="shop-page__main">
                         <div className="shop-page__header">
                              {SHOP_FILTERS.map((filter) => (
                                   <button
                                        key={filter.type}
                                        onClick={() => setCurrentFilter(filter.type)}
                                        className={clsx(
                                             "shop-page__header-button",
                                             currentFilter === filter.type && "shop-page__header-button--active"
                                        )}
                                   >
                                        {filter.label}
                                   </button>
                              ))}
                         </div>

                         <div className="shop-page__filter-card">
                              <div className="shop-page__filter-card-title">
                                   <Funnel className="shop-page__filter-icon" width={12} height={12} />
                                   <p className="primary-text">Filter by Rarity</p>
                              </div>
                              <div className="shop-page__filter-card-buttons">
                                   {RARITY_FILTERS.map((filter) => (
                                        <button
                                             key={filter.type}
                                             className={clsx(
                                                  "shop-page__filter-button",
                                                  `shop-page__filter-button--${filter.type}`,
                                                  currentRarity === filter.type && "shop-page__filter-button--active"
                                             )}
                                             onClick={() => setCurrentRarity(filter.type)}
                                        >
                                             {filter.label}
                                        </button>
                                   ))}
                              </div>
                         </div>

                         <div className="shop-page__cards">
                              {sortedNfts.map((nft) => (
                                   <NftCard
                                        key={nft.name}
                                        name={nft.name}
                                        price={nft.price}
                                        rarity={nft.rarity}
                                        type={nft.type}
                                   />
                              ))}
                         </div>
                    </div>

                    <aside className="shop-page__sidebar">
                         <InfoCard />
                    </aside>
               </div>
          </section>
     );
};

export default ShopPage;
