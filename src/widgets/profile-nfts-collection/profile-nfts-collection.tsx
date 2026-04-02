import { clsx } from "clsx";
import { useMe } from "@/entities/user";
import { NftExhibidCard } from "@/features/nft";
import "./profile-nfts-collection.scss";

interface IProfileNftsCollectionProps {
    className?: string;
}

const ProfileNftsCollection = ({ className }: IProfileNftsCollectionProps) => {
    const user = useMe().data;
    if (!user) {
        return <div>[ ProfileNftsCollection.tsx ] Loading...</div>;
    }

    const userNfts = user.nfts;

    return (
        <div className={clsx(className, "profile-nfts-collection")}>
            <div className="profile-nfts-collection__heading">
                <h2 className="profile-nfts-collection__title title">
                    My NFT Сollection
                </h2>
                <p className="profile-nfts-collection__subtitle">{`${user.nfts.length} NFTs owned`}</p>
            </div>
            <div className="profile-nfts-collection__container">
                {userNfts.map((nft) => (
                    <NftExhibidCard
                        key={nft.name}
                        name={nft.name}
                        image={nft.image}
                    />
                ))}
            </div>
        </div>
    );
};
export { ProfileNftsCollection };
