import { Funnel, Wallet } from "lucide-react";
import { RARITY_FILTERS, SHOP_FILTERS, ShopFilterType, ShopRarityFilterType } from "@/shared/constants/Shop";
import { AddFundsModal } from "@/features/add-funds-modal/ui/AddFundsModal";
import { useNftStore } from "@/shared/store/useNftStore";
import { NftCard } from "@/features/nft-card/NftCard";
import { useUser } from "@/shared/store/useUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ShopPage.scss";
import { Button } from "@/shared/ui/button";
import clsx from "clsx";

export const ShopPage = () => {
     const [currentFilter, setCurrentFilter] = useState<ShopFilterType>("all");
     const [currentRarity, setCurrentRarity] = useState<ShopRarityFilterType>("all");
     const [isFundsModalOpen, setFundsModalOpen] = useState(false);

     const userNfts = useUser((s) => s.nfts);
     const nfts = useNftStore((s) => s.nfts);
     const navigate = useNavigate();
     const user = useUser();

     const userBalance = user.balance?.amount || 0;
     const isAuth = !!user.token;

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
                                        >
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
                              <div className="info-card card">
                                   <div className="info-card__header">
                                        <div className="info-card__wallet-icon">
                                             <Wallet className="info-card__icon" width={24} height={24} />
                                        </div>
                                        <div className="info-card__title">
                                             <h3 className="info-card__wallet-title">
                                                  {isAuth ? "Your Wallet" : "Wallet Access"}
                                             </h3>
                                             <p className="info-card__wallet-status">
                                                  {isAuth ? "Connected" : "Not Connected"}
                                             </p>
                                        </div>
                                   </div>

                                   {!isAuth ? (
                                        <div className="info-card__not-auth">
                                             <div className="info-card__not-auth-box">
                                                  <p className="info-card__not-auth-title">You are not logged in</p>
                                                  <p className="info-card__not-auth-subtitle">
                                                       Sign in to access your wallet, balance and NFTs.
                                                  </p>
                                                  <Button
                                                       className="info-card__button info-card__login-button"
                                                       variant="default"
                                                       onClick={() => navigate("/login")}
                                                  >
                                                       Login
                                                  </Button>
                                             </div>
                                        </div>
                                   ) : (
                                        <>
                                             <div className="info-card__wallet-stats">
                                                  <div className="info-card__wallet-box wallet-box">
                                                       <p className="wallet-box__title primary-text">Balance</p>
                                                       <div className="wallet-box__content">
                                                            <span className="wallet-box__stat-value wallet-box__balance">
                                                                 {userBalance.toFixed(2)}
                                                            </span>
                                                            <p className="primary-text">SMG Coins</p>
                                                       </div>
                                                  </div>

                                                  <div className="info-card__wallet-box wallet-box">
                                                       <p className="wallet-box__title primary-text">Owned NFTs</p>
                                                       <div className="wallet-box__content">
                                                            <span className="wallet-box__stat-value">0</span>
                                                       </div>
                                                  </div>

                                                  <div className="info-card__wallet-box wallet-box">
                                                       <p className="wallet-box__title primary-text">Total Value</p>
                                                       <div className="wallet-box__content">
                                                            <span className="wallet-box__stat-value">0.00 SMARAGD</span>
                                                            <span className="primary-text">$0.00</span>
                                                       </div>
                                                  </div>
                                             </div>

                                             <Button
                                                  className="info-card__button"
                                                  size={"sm"}
                                                  onClick={() => setFundsModalOpen(true)}
                                             >
                                                  Add Funds
                                             </Button>
                                        </>
                                   )}
                              </div>
                         </aside>
                    </div>
               </section>
          </>
     );
};