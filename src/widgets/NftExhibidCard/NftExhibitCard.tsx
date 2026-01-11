import clsx from "clsx";
import { Button } from "@/shared/ui/Button";
import { useUserStore } from "@/entities/User/model/store";
import "./NftExhibidCard.scss";

interface INftExhibidCardProps {
    image: string;
    name: string;
    className?: string;
}

const NftExhibidCard = ({ image, name, className }: INftExhibidCardProps) => {
    const setAvatar = useUserStore((s) => s.setAvatar);

    const handleSetAvatar = () => {
        setAvatar(image);
    };

    return (
        <div className={clsx(className, "nft-exhibid-card")}>
            <div className="nft-exhibid-card__image-wrapper">
                <img
                    src={image}
                    alt={name}
                    className="nft-exhibid-card__image"
                />
            </div>
            <div className="nft-exhibid-card__bottom">
                <p className="nft-exhibid-card__name">{name}</p>
                <Button size="sm" onClick={handleSetAvatar}>
                    Set as Avatar
                </Button>
            </div>
        </div>
    );
};

export { NftExhibidCard };
