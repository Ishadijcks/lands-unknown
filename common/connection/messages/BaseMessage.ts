import { z } from "zod";
import { MessageType } from "common/connection/messages/MessageType";

export const BaseMessageSchema = z.object({
  type: z.nativeEnum(MessageType),
});

export type BaseMessage = z.infer<typeof BaseMessageSchema>;
