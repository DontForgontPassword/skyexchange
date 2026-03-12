import { Edit, LogOut, Mail, User as UserIcon } from "lucide-react";
import { useUserStore } from "@/entities/User/model/store";
import { Button } from "@/shared/ui/Button";
import { clsx } from "clsx";
import "./ProfileCard.scss";
import { Card } from "@/shared/ui/Card";
import { useAuthStore } from "@/entities/Auth";

interface IProfileCardProps {
    className?: string;
}

const ProfileCard = ({ className }: IProfileCardProps) => {
    const user = useUserStore()!;
    const logout = useAuthStore((state) => state.logout);

    const defaultBalance = user.balances.find(
        (b) => b.currency === user.defaultCurrency
    );

    return (
        <div className={clsx(className, "profile-card")}>
            <div className="profile-card__inner">
                <div className="profile-card__avatar">
                    {user.avatarImage ? (
                        <img
                            className="profile-card__avatar-image"
                            src={user.avatarImage}
                            alt="avatar"
                        />
                    ) : (
                        <UserIcon width={96} height={96} />
                    )}
                </div>

                <div className="profile-card__info">
                    <div className="profile-card__info-item">
                        <p className="profile-card__info-item-label primary-text">
                            Username
                        </p>
                        <p className="profile-card__info-item-value profile-card__info-item-value--username">
                            {user.username}
                        </p>
                    </div>

                    <div className="profile-card__info-item">
                        <p className="profile-card__info-item-label primary-text">
                            <Mail width={16} height={16} />
                            Email / Wallet ID
                        </p>
                        <p className="profile-card__info-item-value profile-card__info-item-value--mail">
                            {user.email}
                        </p>
                    </div>
                </div>

                <div className="profile-card__stats">
                    <Card className="profile-card__stats-item">
                        <p className="profile-card__stats-item-label primary-text">
                            Balance
                        </p>
                        <p className="profile-card__stats-item-value profile-card__stats-item-value--balance">
                            {defaultBalance?.value ?? 0}
                            <span className="primary-text">
                                {defaultBalance?.name ?? user.defaultCurrency}
                            </span>
                        </p>
                    </Card>

                    <Card className="profile-card__stats-item">
                        <p className="profile-card__stats-item-label primary-text">
                            High Score
                        </p>
                        <p className="profile-card__stats-item-value">
                            {user.game.score}
                            <span className="primary-text">Points</span>
                        </p>
                    </Card>
                </div>

                <div className="profile-card__actions">
                    <Button
                        className="profile-card__actions-button"
                        variant="default"
                    >
                        <Edit width={16} height={16} />
                        Edit Profile
                    </Button>

                    <Button
                        className="profile-card__actions-button"
                        variant="outline"
                        onClick={logout}
                    >
                        <LogOut width={16} height={16} />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export { ProfileCard };
