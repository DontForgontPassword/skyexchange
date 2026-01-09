import {clsx} from 'clsx'
import { Check, ShoppingCart } from 'lucide-react'
import { FC } from 'react'
import { firstUpper } from '@/shared/utils/string'
import { RarityType } from '@/shared/types/filter'
import { Button } from '@/shared/ui/button'
import './NtfCard.scss'
import { usePurchase } from '../model/usePurchase'
import { useNftStore } from '@/shared/store/useNftStore'

interface NftCardProps {
    rarity: RarityType;
    name: string;
    price: number;
    type: string;
    image: string;
    purchased: boolean;
    className?: string;
}

export const NftCard: FC<NftCardProps> = ({
    rarity,
    name,
    price,
    type,
    image,
    purchased,
    className,
}) => {
    const { nfts } = useNftStore.getState()

    const { purchase } = usePurchase()

    const handlePurchaseNft = () => {
        const nft = nfts.find((nft) => nft.name === name)
        if (!nft) {
            throw new Error('NFT not found')
        }

        purchase(name, nft.price)
    }

    return (
        <div className={clsx('nft-card', className)}>
            <div className="nft-card__image-wrapper">
                <img src={image} alt={name} className="nft-card__image" />

                {purchased && (
                    <span className="nft-card__purchased-text">
                        <Check width={12} height={12} />
                        Owned
                    </span>
                )}

                <div className="nft-card__info">
                    <span
                        className={clsx(
                            'nft-card__rarity-text',
                            `nft-card__rarity-text--${rarity.toLocaleLowerCase()}`,
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
                        <p className="nft-card__price">{price} <span>SMG</span></p>
                    </div>
                    <Button
                        disabled={purchased}
                        size="sm"
                        onClick={handlePurchaseNft}
                        className={clsx(
                            'nft-card__acquire-button',
                            purchased && 'nft-card__acquire-button--owned',
                        )}
                    >
                        {purchased ? (
                            <Check width={16} />
                        ) : (
                            <ShoppingCart width={16} />
                        )}
                        {purchased ? 'Owned' : 'Buy'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
