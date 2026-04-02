import { Edit, LogOut, Mail, User as UserIcon } from "lucide-react";
import { clsx } from "clsx";

import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";

import { useAuthStore } from "@/features/auth";
import { Avatar } from "@/entities/avatar";
import { useBalance, useMe } from "@/entities/user";
import "./ProfileCard.scss";

interface IProfileCardProps {
    className?: string;
}

const ProfileCard = ({ className }: IProfileCardProps) => {
    const logout = useAuthStore((state) => state.logout);

    const { data: user } = useMe();
    const { data: balance } = useBalance("smg");

    const formattedBalance = balance
        ? `${balance.amount.toFixed(2)} ${balance.id.toUpperCase()}`
        : "0.00 SMG";

    return (
        <div className={clsx("profile-card", className)}>
            <div className="profile-card__inner">
                <Avatar src={user?.avatarImage} />

                <div className="profile-card__info">
                    <div className="profile-card__info-item">
                        <p className="profile-card__info-item-label primary-text">
                            Username
                        </p>
                        <p className="profile-card__info-item-value profile-card__info-item-value--username">
                            {user?.username ?? "N/A"}
                        </p>
                    </div>

                    <div className="profile-card__info-item">
                        <p className="profile-card__info-item-label primary-text">
                            <Mail width={16} height={16} />
                            Email / Wallet ID
                        </p>
                        <p className="profile-card__info-item-value profile-card__info-item-value--mail">
                            {user?.email ?? "N/A"}
                        </p>
                    </div>
                </div>

                {/* stats */}
                <div className="profile-card__stats">
                    <Card className="profile-card__stats-item">
                        <p className="profile-card__stats-item-label primary-text">
                            Balance
                        </p>
                        <p className="profile-card__stats-item-value profile-card__stats-item-value--balance">
                            <span className="primary-text">
                                {formattedBalance}
                            </span>
                        </p>
                    </Card>

                    <Card className="profile-card__stats-item">
                        <p className="profile-card__stats-item-label primary-text">
                            High Score
                        </p>
                        <p className="profile-card__stats-item-value">
                            <span className="primary-text">
                                {user?.game?.score ?? 0} Points
                            </span>
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
