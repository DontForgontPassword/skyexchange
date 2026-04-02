import { useMutation } from "@tanstack/react-query";
import { register } from "../api/register";
import { useAuthStore } from "../model/store";

export const useRegister = () => {
    const setAuth = useAuthStore((s) => s.setAuth);

    return useMutation({
        mutationFn: ({
            username,
            email,
            password,
        }: {
            username: string;
            email: string;
            password: string;
        }) => register(username, email, password),

        onSuccess: (data) => {
            setAuth(data);
        },
    });
};