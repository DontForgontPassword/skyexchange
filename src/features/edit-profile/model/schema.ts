import { z } from "zod";

export const editSchema = z.object({
    username: z.string(),
    email: z.string().email(),
});
