import { UserIcon } from "lucide-react";

interface AvatarProps {
    src?: string | null;
}

const Avatar = ({ src }: AvatarProps) => {
    return (
        <div className="profile-card__avatar">
            {src ? (
                <img
                    className="profile-card__avatar-image"
                    src={src}
                    alt="avatar"
                />
            ) : (
                <UserIcon width={96} height={96} />
            )}
        </div>
    );
};
export { Avatar };
