import { api } from "@/shared/api/axios";
import { User } from "../model/types";

const UserAPI = {
    getMe: () => api.get<User>("/user/me"),
    setAvatar: (image: string) => api.post<User>("/user/avatar", { image }),
};

export { UserAPI };
