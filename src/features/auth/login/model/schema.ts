import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Incorrect email"),
    password: z.string().min(6, "Password should contain minimum 6 characters"),
});
