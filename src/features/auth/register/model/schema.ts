import z from "zod";

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(3, "Username should contant minimum 3 characters."),
        email: z.string().email("Incorrect email"),
        password: z
            .string()
            .min(6, "Password should contain minimum 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });
