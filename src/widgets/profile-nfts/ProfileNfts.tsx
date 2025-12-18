import { useUser } from '@/shared/store/useUser';

const ProfileNfts = () => {
    const user = useUser.getState();

    return (
        <div className="profile-nfts card">
            <div className="profile-nfts__title-wrapper">
                <h2 className="profile-nfts__title title">My NFT Сollection</h2>
                <p className="">{`${user.nfts.length} NFTs owned`}</p>
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
