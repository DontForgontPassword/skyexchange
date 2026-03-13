import { api } from "@/shared/api/axios";
import { User } from "../model/types";
import { toast } from "sonner";

const UserAPI = {
    getMe: () => {
        const response = api.get<User>("/user/me");

        response.catch((error) => {
            toast.error("Failed to fetch user data");
            console.error("Error fetching user data:", error);
        });
        return response;
    },
    setAvatar: (image: string) => api.post<User>("/user/avatar", { image }),
};

export { UserAPI };
