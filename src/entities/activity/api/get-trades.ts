import { api } from "@/shared/api/axios";
import { ITrade } from "./types";

export const getTrades: () => Promise<ITrade[]> = async () => {
    const { data } = await api.get("/api/exchange/trade-activity");
    return data;
};
