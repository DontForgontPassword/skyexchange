import { api } from "@/shared/api";
import { Balance } from "../model/types";

export const getBalance = async (id: string) => {
    const { data } = await api.get<Balance>(`/api/user/balance`, {
        params: { id },
    });
    return data;
};