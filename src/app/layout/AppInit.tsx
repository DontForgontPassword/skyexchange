import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/app/provider";
import { clearUser, setUser, useGetMeQuery } from "@/entities/user";
import { AppSpinner } from "@/widgets/AppSpinner";

interface IAppInitProps {
    children: ReactNode;
}

export const AppInit = ({ children }: IAppInitProps) => {
    const dispatch = useAppDispatch();

    const { data, isError, isLoading } = useGetMeQuery();

    useEffect(() => {
        if (data) {
            dispatch(setUser(data));
        } else if (isError) {
            dispatch(clearUser());
        }
    }, [data, isError]);

    if (isLoading) {
        return <AppSpinner />;
    }

    return children;
};
