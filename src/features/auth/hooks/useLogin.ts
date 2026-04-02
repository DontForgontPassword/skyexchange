import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";
import { useAuthStore } from "../model/store";

export const useLogin = () => {
    const setAuth = useAuthStore((s) => s.setAuth);

    return useMutation({
        mutationFn: ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => login(email, password),

        onSuccess: (data) => {
            setAuth(data);
        },
    });
};