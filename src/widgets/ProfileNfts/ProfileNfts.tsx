import { clsx } from "clsx";
import { NftExhibidCard } from "@/widgets/NftExhibidCard/NftExhibitCard";
import { useUserFullNfts } from "@/entities/User/hooks/useUserFullNfts";
import "./ProfileNfts.scss";

interface IProfileNftsProps {
    className?: string;
}

const ProfileNfts = ({ className }: IProfileNftsProps) => {
    const fullNfts = useUserFullNfts();

    return (
        <div className={clsx(className, "profile-nfts")}>
            <div className="profile-nfts__heading">
                <h2 className="profile-nfts__title title">My NFT Сollection</h2>
                <p className="profile-nfts__subtitle">{`${fullNfts.length} NFTs owned`}</p>
            </div>
            <div className="profile-nfts__container">
                {fullNfts.map((nft) => (
                    <NftExhibidCard
                        key={nft.name}
                        image={nft.image}
                        name={nft.name}
                    />
                ))}
            </div>
        </div>
    );
};
export { ProfileNfts };
