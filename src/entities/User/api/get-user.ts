import { api } from "@/shared/api";
import { User } from "@/shared/types/user";

export const getUser = async () => {
    const { data } = await api.get<User>("/api/user/me");
    return data;
};
