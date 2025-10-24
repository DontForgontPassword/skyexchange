import { useState } from "react";
import clsx from "clsx";
import "./ShopPage.scss";
import NftCard from "./ui/NtfCard";
import InfoCard from "./ui/InfoCard";
import { Funnel } from "lucide-react";
import { RarityType } from "@/shared/types";

type ShopFilterType = "all" | "popular" | "new" | "my";
type ShopRarityFilterType = "all" | "legendary" | "epic" | "rare" | "common";

interface ShopFilter {
     label: string;
     type: ShopFilterType;
}

interface ShopRarityFilter {
     label: string;
     type: ShopRarityFilterType;
}

interface Nft {
     name: string;
     rarity: RarityType;
     price: number;
     type: ShopFilterType; // Добавим поле для основного фильтра
}

const ShopPage = () => {
     const [currentFilter, setCurrentFilter] = useState<ShopFilterType>("all");
     const [currentRarity, setCurrentRarity] = useState<ShopRarityFilterType>("all");

     const SHOP_FILTERS: ShopFilter[] = [
          { label: "All", type: "all" },
          { label: "Popular", type: "popular" },
          { label: "New", type: "new" },
          { label: "My NFTs", type: "my" },
     ];

     const RARITY_FILTERS: ShopRarityFilter[] = [
          { label: "All", type: "all" },
          { label: "Legendary", type: "legendary" },
          { label: "Epic", type: "epic" },
          { label: "Rare", type: "rare" },
          { label: "Common", type: "common" },
     ];

     const nfts: Nft[] = [
          { name: "Tech Samurai #4821", rarity: "Epic", price: 178.45, type: "popular" },
          { name: "Digital Phantom #7392", rarity: "Rare", price: 112.38, type: "popular" },
          { name: "Emerald Knight #1205", rarity: "Legendary", price: 201.77, type: "new" },
          { name: "Cyber Guardian #9451", rarity: "Common", price: 67.12, type: "new" },
          { name: "Neon Soul #3178", rarity: "Epic", price: 144.89, type: "new" },
          { name: "Quantum Ranger #5823", rarity: "Rare", price: 198.45, type: "popular" },
          { name: "Void Hunter #4709", rarity: "Legendary", price: 230.12, type: "popular" },
          { name: "Emerald Warrior #8632", rarity: "Common", price: 91.77, type: "new" },
          { name: "Tech Samurai #2951", rarity: "Epic", price: 152.34, type: "new" },
          { name: "Cyber Guardian #7284", rarity: "Rare", price: 123.67, type: "new" },
     ];

     const filteredNfts = nfts
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
