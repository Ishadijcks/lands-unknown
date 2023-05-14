import { z } from "zod";
import { RequestType } from "common/connection/requests/RequestType";

export const BaseRequestSchema = z.object({
  type: z.literal(RequestType.Example),
});

export type BaseRequest = z.infer<typeof BaseRequestSchema>;
