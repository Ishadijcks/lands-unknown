import { z } from "zod";
import { RequestType } from "common/connection/requests/RequestType";

export const BaseRequestSchema = z
  .object({
    type: z.nativeEnum(RequestType),
  })
  .strict();

export type BaseRequest = z.infer<typeof BaseRequestSchema>;
