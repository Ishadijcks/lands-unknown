import { z } from "zod";

export const LogInSchema = z
  .object({
    email: z.string().min(1),
    password: z.string().min(1),
  })
  .strict();

export type LogInInfo = z.infer<typeof LogInSchema>;
