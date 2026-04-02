import axios from "axios";
import { useAuthStore } from "@/features/auth";
import { BASE_URL } from "../config/Server";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;

    if (token && !config.url?.includes("/auth")) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export { api };
