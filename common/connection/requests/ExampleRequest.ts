import { z } from "zod";
import { RequestType } from "common/connection/requests/RequestType";
import { BaseRequestSchema } from "common/connection/requests/BaseRequest";

export const ExampleRequestSchema = BaseRequestSchema.extend({
  type: z.literal(RequestType.Example),
  amount: z.number().min(3).max(4),
});

export type ExampleRequest = z.infer<typeof ExampleRequestSchema>;
