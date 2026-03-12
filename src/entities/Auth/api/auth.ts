import api from "@/shared/api/axios";

const AuthAPI = {
    login: (email: string, password: string) =>
        api.post("/user/login", {  email, password }),

    register: (username: string, email: string, password: string) =>
        api.post("/user/register", { username, email, password }),

    profile: () => api.get("/profile"),
};

export { AuthAPI };
