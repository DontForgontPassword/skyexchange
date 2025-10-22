import { useState } from "react";
import clsx from "clsx";
import "./ShopPage.scss";
import NftCard from "./ui/NtfCard";
import { rarityType } from "@/shared/types";

type shopFilter = "all" | "popular" | "new" | "my";

const ShopPage = () => {
     const SHOP_FILTERS: {
          label: string;
          type: shopFilter;
     }[] = [
               { label: "All", type: "all" },
               { label: "Popular", type: "popular" },
               { label: "New", type: "new" },
               { label: "My NFTs", type: "my" },
          ];

     const [currentShopFilter, setCurrentShopFilter] = useState<shopFilter>("all")

     const nfts: {
          rarity: rarityType,
          name: string;
          price: number;
     }[] = [
               {
                    name: 'Tech Samurai #4821',
                    rarity: 'Epic',

                    price: 178.45
               },
               {
                    name: 'Digital Phantom #7392',
                    rarity: 'Rare',
                    price: 112.38
               },
               {
                    name: 'Emerald Knight #1205',
                    rarity: 'Legendary',
                    price: 201.77
               },
               {
                    name: 'Cyber Guardian #9451',
                    rarity: 'Common',
                    price: 67.12
               },
               {
                    name: 'Neon Soul #3178',
                    rarity: 'Epic',
                    price: 144.89
               },
               {
                    name: 'Quantum Ranger #5823',
                    rarity: 'Rare',
                    price: 198.45
               },
               {
                    name: 'Void Hunter #4709',
                    rarity: 'Legendary',
                    price: 230.12
               },
               {
                    name: 'Emerald Warrior #8632',
                    rarity: 'Common',
                    price: 91.77
               },
               {
                    name: 'Tech Samurai #2951',
                    rarity: 'Epic',
                    price: 152.34
               },
               {
                    name: 'Cyber Guardian #7284',
                    rarity: 'Rare',
                    price: 123.67
               }
          ];

     return (
          <section className="shop">
               <div className="shop__inner container">
                    <div className="shop__content">
                         <div className="shop__header">
                              {
                                   SHOP_FILTERS.map((filter) => {
                                        return <button onClick={() => setCurrentShopFilter(filter.type)} className={clsx("shop__header-button", currentShopFilter === filter.type ? `shop__header-button--active` : "")} key={filter.type}>{filter.label}</button>
                                   })
                              }
                         </div>
                         <div className="shop__cards">
                              {
                                   nfts.map((nft) => {
                                        return <NftCard name={nft.name} price={nft.price} rarity={nft.rarity} />
                                   })
                              }
                         </div>
                    </div>
               </div>
          </section>
     );
}

export default ShopPage;