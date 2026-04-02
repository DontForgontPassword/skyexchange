import { ProfileNftsCollection } from "@/widgets/profile-nfts-collection";
import { ProfileCard } from "@/widgets/ProfileCard";
import "./page.scss";

export const ProfilePage = () => {
    return (
        <section className="profile-page container">
            <div className="profile-page__inner">
                <ProfileCard className="profile-page__profile-card" />
                <ProfileNftsCollection className="profile-page__profile-nfts" />
            </div>
        </section>
    );
};
