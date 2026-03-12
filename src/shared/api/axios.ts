import axios from "axios";
import { useAuthStore } from "@/entities/Auth";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export { api as default };