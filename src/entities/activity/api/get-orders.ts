import { api } from "@/shared/api/axios";
import { IOrder } from "./types";

export const getOrders: () => Promise<IOrder[]> = async () => {
    const { data } = await api.get("/api/exchange/order-activity");
    return data;
};
