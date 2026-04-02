import { api } from "@/shared/api";

export const updateAvatar = async (avatarId: string) => {
    api.post("/api/user/avatar", {
        avatarId,
    });
};
