import { Button } from "@/shared/ui/Button";
import { useCallback } from "react";
import { useUpdateAvatarMutation } from "../api/avatarApi";
import { toast } from "sonner";

interface ISetAvatarButtonProps {
    avatarImage: string;
}

const SetAvatarButton = ({ avatarImage }: ISetAvatarButtonProps) => {
    const [updateAvatar] = useUpdateAvatarMutation();

    const handleSetAvatar = useCallback(async () => {
        const response = await updateAvatar(avatarImage).unwrap();

        response.success
            ? toast.success("Avatar updated successfully.")
            : toast.error("Error while updating avatar.");
    }, [avatarImage]);

    return (
        <Button size="sm" onClick={handleSetAvatar}>
            Set as Avatar
        </Button>
    );
};

export { SetAvatarButton };
