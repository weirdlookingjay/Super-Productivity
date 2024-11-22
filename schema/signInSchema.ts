import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string(),
});

export type SignInSchema = z.infer<typeof signInSchema>;
