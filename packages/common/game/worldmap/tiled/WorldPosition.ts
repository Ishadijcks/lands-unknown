import { z } from "zod";

export const WorldPositionSchema = z
  .object({
    x: z.number().int(),
    y: z.number().int(),
  })
  .strict();

export type WorldPosition = z.infer<typeof WorldPositionSchema>;
