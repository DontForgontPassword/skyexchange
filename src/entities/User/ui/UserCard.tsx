import { Balance } from "@/shared/model";
import { Avatar } from "./Avatar";
import { Edit, Mail } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { clsx } from "clsx";
import { Button } from "@/shared/ui/Button";
import { LogoutButton } from "@/features/auth/logout";
import { User } from "../model/types";
import { useState } from "react";
import { Input } from "@/shared/ui/Input";
import { useEditProfileMutation } from "@/features/edit-profile";
import { Skeleton } from "@/shared/ui/Skeleton";
import "./UserCard.scss";
import { TextSkeleton } from "@/shared/ui/TextSkeleton";

interface Props {
    className?: string;
    user: User;
    balance: Balance;
}

const UserCard = ({ className, user, balance }: Props) => {
    // todo: Вынести фичи в фич категорию
    const [isEditing, setEditing] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [editProfile, { isLoading }] = useEditProfileMutation();

    const handleEditProfile = async () => {
        if (isEditing) {
            await editProfile({
                email,
                username
            });
        }

        setEditing((prev) => !prev);
    }

    return (
        <Card className={clsx("user-card", className)}>
            <div className="user-card__inner">
                <Avatar className="user-card__avatar" src={user?.avatarImage} />

                <div className="user-card__info">
                    <div className="user-card__info-item">
                        <p className="user-card__info-item-label primary-text">
                            Username
                        </p>
                        {
                            isLoading ? (
                                <TextSkeleton width="40%" height="25px" />
                            ) : isEditing ? (
                                <Input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            ) : (
                                <p className="user-card__info-item-value user-card__info-item-value--username">
                                    {user.username ?? "N/A"}
                                </p>
                            )
                        }
                    </div>

                    <div className="user-card__info-item">
                        <p className="user-card__info-item-label primary-text">
                            <Mail width={16} height={16} />
                            Email / Wallet ID
                        </p>
                        {
                            !isEditing ? (
                                <p className="profile-card__info-item-value profile-card__info-item-value--mail">
                                    {user.email ?? "N/A"}
                                </p>
                            ) : <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        }
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
                        onClick={handleEditProfile}
                    >
                        <Edit width={16} height={16} />
                        Edit Profile
                    </Button>

                    <LogoutButton />
                </div>
            </div>
        </Card>
    );
};

export { UserCard };
