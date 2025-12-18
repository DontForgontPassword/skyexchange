import { Funnel } from 'lucide-react'
import { useState } from 'react'
import { AddFundsModal } from '@/features/add-funds-modal/ui/AddFundsModal'
import { NftCard } from '@/features/nft-card/ui/NftCard'
import { RARITY_FILTERS, SHOP_FILTERS, ShopFilterType, ShopRarityFilterType } from '@/shared/constants/Shop'
import { useNftStore } from '@/shared/store/useNftStore'
import { useUser } from '@/shared/store/useUser'
import './ShopPage.scss'
import { Button } from '@/shared/ui/button'
import clsx from 'clsx'
import { InfoCard } from '@/widgets/info-card'

export const ShopPage = () => {
     const [currentFilter, setCurrentFilter] = useState<ShopFilterType>('all')
     const [currentRarity, setCurrentRarity] = useState<ShopRarityFilterType>('all')
     const [isFundsModalOpen, setFundsModalOpen] = useState(false)

     const user = useUser.getState()
     const nfts = useNftStore((s) => s.nfts)

     const userNftNames = new Set(user.nfts.map((nft) => nft.name))

     const filteredNfts = nfts
          .filter(nft => {
               switch (currentFilter) {
                    case 'all':
                         return true
                    case 'popular':
                         return nft.type === 'popular'
                    case 'new':
                         return nft.type === 'new'
                    case 'my':
                         return userNftNames.has(nft.name)
                    default:
                         return true
               }
          })
          .filter(nft => currentRarity === 'all' || nft.rarity.toLowerCase() === currentRarity)

     const sortedNfts = filteredNfts.sort((a, b) => a.price - b.price)

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
                                                  'shop-page__header-button',
                                                  currentFilter === filter.type && 'shop-page__header-button--active'
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
                                                       'shop-page__filter-button',
                                                       `shop-page__filter-button--${filter.type}`,
                                                       currentRarity === filter.type && 'shop-page__filter-button--active'
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
     )
}