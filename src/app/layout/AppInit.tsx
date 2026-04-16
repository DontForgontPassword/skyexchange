import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/app/provider";
import { clearUser, setUser, useGetMeQuery } from "@/entities/user";
import { Skeleton } from "@/shared/ui/Skeleton";
import { AppInitError } from "./AppInitError";

interface Props {
    children: ReactNode;
}

export const AppInit = ({ children }: Props) => {
    const dispatch = useAppDispatch();

    const { data, isError, error, isLoading } = useGetMeQuery();

    useEffect(() => {
        if (data) {
            dispatch(setUser(data));
        } else if (isError) {
            dispatch(clearUser());
        }
    }, [data, isError]);

    if (isLoading) {
        return <Skeleton />;
    }

    if (error && "status" in error && error.status !== 401) {
        console.log(error);

        return <AppInitError />
    }

    return children;
};
