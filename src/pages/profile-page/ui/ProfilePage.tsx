import { ProfileCard } from "@/widgets/profile-card/ProfileCard";
import "./ProfilePage.scss";
import ProfileNfts from "@/widgets/profile-nfts/ProfileNfts";

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
