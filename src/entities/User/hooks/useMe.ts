import { useEffect } from "react";
import { useAuthStore } from "@/features/auth";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/get-user";

export const useMe = () => {
    const token = useAuthStore((s) => s.accessToken);
    const setAuth = useAuthStore((s) => s.setAuth);

    const query = useQuery({
        queryKey: ["me"],
        queryFn: getUser,
        enabled: !!token,
    });

    useEffect(() => {
        if (query.data) {
            setAuth({
                user: query.data,
                accessToken: token!,
            });
        }
    }, [query.data]);

    return query;
};