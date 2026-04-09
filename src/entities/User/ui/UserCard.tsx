import { Balance } from "@/shared/model";
import { Avatar } from "./Avatar";
import { Edit, Mail } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { clsx } from "clsx";
import { Button } from "@/shared/ui/Button";
import { LogoutButton } from "@/features/auth/logout";
import { User } from "../model/types";
import "./UserCard.scss";

interface IUserCardProps {
    className?: string;
    user: User;
    balance: Balance;
}

const UserCard = ({ className, user, balance }: IUserCardProps) => {
    return (
        <div className={clsx("user-card", className)}>
            <div className="user-card__inner">
                <Avatar className="user-card__avatar" src={user?.avatarImage} />

                <div className="user-card__info">
                    <div className="user-card__info-item">
                        <p className="user-card__info-item-label primary-text">
                            Username
                        </p>
                        <p className="user-card__info-item-value user-card__info-item-value--username">
                            {user?.username ?? "N/A"}
                        </p>
                    </div>

                    <div className="user-card__info-item">
                        <p className="user-card__info-item-label primary-text">
                            <Mail width={16} height={16} />
                            Email / Wallet ID
                        </p>
                        <p className="profile-card__info-item-value profile-card__info-item-value--mail">
                            {user?.email ?? "N/A"}
                        </p>
                    </div>
                </div>

                <div className="user-card__stats">
                    <Card className="user-card__stats-item">
                        <p className="user-card__stats-item-label primary-text">
                            Balance
                        </p>
                        <p className="user-card__stats-item-value user-card__stats-item-value--balance">
                            <span className="primary-text">
                                {balance.amount.toFixed(2)}{" "}
                                {balance.id.toUpperCase()}
                            </span>
                        </p>
                    </Card>

                    <Card className="user-card__stats-item">
                        <p className="user-card__stats-item-label primary-text">
                            High Score
                        </p>
                        <p className="user-card__stats-item-value">
                            <span className="primary-text">
                                {user?.game?.score ?? 0} Points
                            </span>
                        </p>
                    </Card>
                </div>

                <div className="user-card__actions">
                    <Button
                        className="user-card__actions-button"
                        variant="default"
                    >
                        <Edit width={16} height={16} />
                        Edit Profile
                    </Button>

                    <LogoutButton />
                </div>
            </div>
        </div>
    );
};

export { UserCard };
