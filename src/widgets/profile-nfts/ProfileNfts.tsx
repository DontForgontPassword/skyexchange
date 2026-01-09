import { useUser } from "@/shared/store/useUser";
import { clsx } from "clsx";
import "./ProfileNfts.scss";
import { useNftStore } from "@/shared/store/useNftStore";
import { NftExhibidCard } from "@/entities/nft/ui/nft-exhibid-card/NftExhibitCard";

interface IProfileNftsProps {
    className?: string;
}

const ProfileNfts = ({ className }: IProfileNftsProps) => {
    const userNfts = useUser((s) => s.nfts);
    const nfts = useNftStore((s) => s.nfts);

    const ownedNfts = userNfts
        .map(({ name }) => nfts.find((nft) => nft.name === name))
        .filter((nft): nft is NonNullable<typeof nft> => nft !== undefined);

    return (
        <div className={clsx("profile-nfts", className)}>
            <div className="profile-nfts__heading">
                <h2 className="profile-nfts__title title">My NFT Сollection</h2>
                <p className="profile-nfts__subtitle">{`${ownedNfts.length} NFTs owned`}</p>
            </div>
            <div className="profile-nfts__container">
                {ownedNfts.map((nft) => (
                    <NftExhibidCard key={nft.name} image={nft.image} name={nft.name} />
                ))}
            </div>
        </div>
    );
};

export default ProfileNfts;
