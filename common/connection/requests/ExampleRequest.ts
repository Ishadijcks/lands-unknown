import { z } from "zod";
import { RequestHrid } from "./RequestHrid";

export const ExampleRequestSchema = z.object({
  type: z.literal(RequestHrid.Example),
  amount: z.number().min(3).max(4),
});

export type ExampleRequest = z.infer<typeof ExampleRequestSchema>;
