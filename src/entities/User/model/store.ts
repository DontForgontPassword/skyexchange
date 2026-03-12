import { useAuthStore } from "@/entities/Auth";

const useUserStore = () => {
    const user = useAuthStore((state) => state.user);

    return user;
};

export { useUserStore };