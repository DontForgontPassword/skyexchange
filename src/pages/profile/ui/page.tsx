import { ProfileNftsCollection } from "@/widgets/ProfileNftsCollection";
import { UserCard } from "@/entities/user";
import { useGetBalanceQuery, useGetMeQuery } from "@/entities/user";
import "./page.scss";
import { useAppSelector } from "@/app/provider";

export const ProfilePage = () => {
    const { data: user, isLoading: isUserLoading } = useGetMeQuery();
    const isAuthorized = useAppSelector((state) => state.auth.isAuthenticated);
    const { data: balance, isLoading: isBalanceLoading } = useGetBalanceQuery(
        undefined,
        {
            skip: !isAuthorized,
        },
    );

    if (isUserLoading || isBalanceLoading || !user || !balance) {
        return <div>Loading...</div>;
    }

    return (
        <section className="profile-page container">
            <div className="profile-page__inner">
                <UserCard
                    user={user}
                    balance={balance}
                    className="profile-user-card"
                />
                <ProfileNftsCollection className="profile-page__profile-nfts" />
            </div>
        </section>
    );
};
