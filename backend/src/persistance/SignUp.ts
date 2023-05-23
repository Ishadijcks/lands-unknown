import { z } from "zod";

export const SignUpSchema = z
  .object({
    userName: z.string().min(3, "Username must be between 3 and 20 characters").max(20),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmation: z.string(),
  })
  .refine((data) => data.password === data.confirmation, {
    message: "Passwords don't match",
    path: ["confirmation"], // path of error
  });

export type SignUpInfo = z.infer<typeof SignUpSchema>;
