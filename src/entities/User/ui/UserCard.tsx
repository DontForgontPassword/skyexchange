import { Balance } from "@/shared/model";
import { Avatar } from "./Avatar";
import { Edit, Mail } from "lucide-react";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { LogoutButton } from "@/features/auth/logout";
import { User } from "../model/types";
import { useEffect, useState } from "react";
import { Input } from "@/shared/ui/Input";
import { useEditProfileMutation } from "@/features/edit-profile";
import { TextSkeleton } from "@/shared/ui/TextSkeleton";
import { toast } from "sonner";
import { clsx } from "clsx";
import "./UserCard.scss";

interface Props {
    className?: string;
    user: User;
    balance: Balance;
}

const UserCard = ({ className, user, balance }: Props) => {
    const [isEditing, setEditing] = useState(false);

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);

    const [editProfile, { isLoading }] = useEditProfileMutation();

    useEffect(() => {
        setUsername(user.username);
        setEmail(user.email);
    }, [user]);

    const handleEditProfile = async () => {
        if (isEditing) {
            try {
                const response = await editProfile({
                    email,
                    username,
                }).unwrap();

                if (!response.success) {
                    toast.error("Failed to edit profile");
                    return;
                }

                setUsername(response.username);
                setEmail(response.email);

                toast.success("Profile updated");
            } catch (error) {
                console.error("Failed to edit profile", error);
                toast.error("Something went wrong");
            }
        }

        setEditing((prev) => !prev);
    };

    return (
        <Card className={clsx("user-card", className)}>
            <div className="user-card__inner">
                <Avatar className="user-card__avatar" src={user?.avatarImage} />

                <div className="user-card__info">
                    <div className="user-card__info-item">
                        <p className="user-card__info-item-label primary-text">
                            Username
                        </p>

                        {isLoading ? (
                            <TextSkeleton width="40%" height="25px" />
                        ) : isEditing ? (
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        ) : (
                            <p className="user-card__info-item-value user-card__info-item-value--username">
                                {username ?? "N/A"}
                            </p>
                        )}
                    </div>

                    <div className="user-card__info-item">
                        <p className="user-card__info-item-label primary-text">
                            <Mail width={16} height={16} />
                            Email / Wallet ID
                        </p>

                        {isLoading ? (
                            <TextSkeleton width="40%" height="25px" />
                        ) : isEditing ? (
                            <Input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        ) : (
                            <p className="user-card__info-item-value user-card__info-item-value--mail">
                                {email ?? "N/A"}
                            </p>
                        )}
                    </div>
                </div>

                <div className="user-card__stats">
                    <Card className="user-card__stats-item">
                        <p className="user-card__stats-item-label primary-text">
                            Balance
                        </p>
                        <p className="user-card__stats-item-value user-card__stats-item-value--balance">
                            <span className="primary-text">
                                {balance?.amount?.toFixed(2) ?? "0.00"}{" "}
                                {balance?.id?.toUpperCase() ?? "SMG"}
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
                        {isEditing ? "Save" : "Edit Profile"}
                    </Button>

                    <LogoutButton />
                </div>
            </div>
        </Card>
    );
};

export { UserCard };
