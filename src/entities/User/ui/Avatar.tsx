import { clsx } from "clsx";
import { UserIcon } from "lucide-react";
import "./Avatar.scss";

interface AvatarProps {
    src?: string | null;
    className?: string;
}

const Avatar = ({ src, className }: AvatarProps) => {
    return (
        <div className={clsx("avatar", className)}>
            {src ? (
                <img
                    className="avatar__image"
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
