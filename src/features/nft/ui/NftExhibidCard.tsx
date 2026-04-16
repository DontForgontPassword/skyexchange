import { clsx } from "clsx";
import { SetAvatarButton } from "@/features/avatar";
import { BASE_URL } from "@/shared/config";
import "./NftExhibidCard.scss";

interface Props {
    avatarImage: string;
    avatarName: string;
    className?: string;
}

const NftExhibidCard = ({
    avatarImage,
    avatarName,
    className,
}: Props) => {
    const image = `${BASE_URL}${avatarImage}`;
    return (
        <div className={clsx(className, "nft-exhibid-card")}>
            <div className="nft-exhibid-card__image-wrapper">
                <img
                    src={image}
                    alt={avatarName}
                    className="nft-exhibid-card__image"
                />
            </div>
            <div className="nft-exhibid-card__bottom">
                <p className="nft-exhibid-card__name">{avatarName}</p>
                <SetAvatarButton avatarImage={image} />
            </div>
        </div>
    );
};

export { NftExhibidCard };
