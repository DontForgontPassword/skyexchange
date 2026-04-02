import { clsx } from "clsx";
import "./ProfileNfts.scss";
import { useMe } from "@/entities/user";

interface IProfileNftsProps {
    className?: string;
}

const ProfileNfts = ({ className }: IProfileNftsProps) => {
    const user = useMe().data;
    if (!user) {
        return <div>[ ProfileNfts.tsx ] Loading...</div>;
    }

    return (
        <div className={clsx(className, "profile-nfts")}>
            <div className="profile-nfts__heading">
                <h2 className="profile-nfts__title title">My NFT Сollection</h2>
                <p className="profile-nfts__subtitle">{`${user.nfts.length} NFTs owned`}</p>
            </div>
            <div className="profile-nfts__container">
                {/* {fullNfts.map((nft) => (
                    <NftExhibidCard
                        key={nft.name}
                        image={nft}
                        name={nft.name}
                    />
                ))} */}
            </div>
        </div>
    );
};
export { ProfileNfts };
