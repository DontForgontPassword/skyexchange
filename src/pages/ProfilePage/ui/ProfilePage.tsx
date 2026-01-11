import { ProfileNfts } from "@/widgets/ProfileNfts/ProfileNfts";
import { ProfileCard } from "@/widgets/ProfileCard/ProfileCard";
import "./ProfilePage.scss";

export const ProfilePage = () => {
    return (
        <section className="profile-page container">
            <div className="profile-page__inner">
                <ProfileCard className="profile-page__profile-card" />
                <ProfileNfts className="profile-page__profile-nfts" />
            </div>
        </section>
    );
};
