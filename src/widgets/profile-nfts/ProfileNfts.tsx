import { useUser } from "@/shared/store/useUser";
import { clsx } from "clsx";
import "./ProfileNfts.scss";

interface IProfileNftsProps {
    className?: string;
}

const ProfileNfts = ({ className }: IProfileNftsProps) => {
    const user = useUser((s) => s);

    return (
        <div className={clsx("profile-nfts", className)}>
            <div className="profile-nfts__heading">
                <h2 className="profile-nfts__title title">My NFT Сollection</h2>
                <p className="profile-nfts__subtitle">{`${user.nfts.length} NFTs owned`}</p>
            </div>
            <div className="profile-nfts__container">
                {user.nfts.map((nft) => (
                    <div key={nft.id}>{nft.id}</div>
                ))}
            </div>
        </div>
    );
};

export default ProfileNfts;
