import { useQuery } from "@tanstack/react-query";
import { getBalance } from "../api/get-balance";

export const useBalance = (id: string, enabled?: boolean) => {
    return useQuery({
        queryKey: ["balance", id],
        queryFn: () => getBalance(id),
        enabled: !!id && enabled,
    });
};
