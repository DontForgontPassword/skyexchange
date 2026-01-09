import { Button } from "@/shared/ui/button";
import clsx from "clsx";
import "./NftExhibidCard.scss"
import { useUser } from "@/shared/store/useUser";

interface INftExhibidCardProps {
    image: string;
    name: string;
    className?: string;
}

const NftExhibidCard = ({ image, name, className }: INftExhibidCardProps) => {
    const user = useUser((s) => s);

    const handleSetAvatar = () => {
        user.setAvatar(image);
    }

    return (
        <div className={clsx('nft-exhibid-card', className)}>
            <div className="nft-exhibid-card__image-wrapper">
                <img src={image} alt={name} className="nft-exhibid-card__image" />
            </div>
            <div className="nft-exhibid-card__bottom">
                <p className="nft-exhibid-card__name">{name}</p>
                <Button size="sm" onClick={handleSetAvatar}>
                    Set as Avatar
                </Button>
            </div>
        </div>
    )
}

export { NftExhibidCard }