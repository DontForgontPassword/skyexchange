import { Edit, LogOut, Mail, User } from "lucide-react";
import { useUser } from "@/shared/store/useUser";
import { Button } from "@/shared/ui/button";
import { clsx } from "clsx";
import "./ProfileCard.scss";

interface IProfileCardProps {
    className?: string;
}

const ProfileCard = ({ className }: IProfileCardProps) => {
    const user = useUser((s) => s);
    const defaultBalance = user.getDefaultBalance();

    const handleLogOut = () => {
        user.reset();
    };

    return (
        <div className={clsx(className, "profile-card")}>
            <div className="profile-card__avatar">
                <User width={96} height={96} />
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
                <div className="profile-card__stats-item">
                    <p className="profile-card__stats-item-label primary-text">
                        <Mail color="var(--primary)" width={16} height={16} />
                        Balance
                    </p>
                    <p className="profile-card__stats-item-value profile-card__stats-item-value--balance">
                        {defaultBalance.value}
                        <span className="primary-text">SMARAGD</span>
                    </p>
                </div>

                <div className="profile-card__stats-item">
                    <p className="profile-card__stats-item-label primary-text">
                        <Mail color="var(--primary)" width={16} height={16} />
                        High Score
                    </p>
                    <p className="profile-card__stats-item-value">
                        {user.game.score}
                        <span className="primary-text">Points</span>
                    </p>
                </div>
            </div>
            <div className="profile-card__actions">
                <Button
                    className="profile-card__actions-button"
                    variant={"default"}
                >
                    <Edit width={16} height={16} />
                    Edit Profile
                </Button>
                <Button
                    className="profile-card__actions-button"
                    variant={"outline"}
                    onClick={handleLogOut}
                >
                    <LogOut width={16} height={16} />
                    Logout
                </Button>
            </div>
        </div>
    );
};

export { ProfileCard };
