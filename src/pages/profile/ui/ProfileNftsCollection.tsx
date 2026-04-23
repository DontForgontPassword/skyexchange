import { clsx } from "clsx";
import { NftExhibidCard } from "@/features/shop";
import { useGetMeQuery } from "@/entities/user";
import { Nft } from "@/shared/model";
import "./ProfileNftsCollection.scss";

interface Props {
    className?: string;
}

const ProfileNftsCollection = ({ className }: Props) => {
    const { data: user, isLoading: isUserLoading } = useGetMeQuery();
    if (isUserLoading || !user) {
        return <div>[ ProfileNftsCollection.tsx ] Loading...</div>;
    }

    const userNfts: Nft[] = user.nfts || [];

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
                        avatarName={nft.name}
                        avatarImage={nft.image}
                    />
                ))}
            </div>
        </div>
    );
};
export { ProfileNftsCollection };
