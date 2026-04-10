import { z } from "zod";

export const loginSchema = z.object({
  userId: z
    .string()
    .min(1, "User ID is required")
    .min(3, "User ID must be at least 3 characters"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// type from schema
export type TLoginForm = z.infer<typeof loginSchema>;
