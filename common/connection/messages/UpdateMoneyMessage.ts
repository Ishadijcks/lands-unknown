import { z } from "zod";
import { BaseMessageSchema } from "common/connection/messages/BaseMessage";
import { MessageType } from "common/connection/messages/MessageType";

export const UpdateMoneyMessageSchema = BaseMessageSchema.extend({
  type: z.literal(MessageType.UpdateMoney),
  amount: z.number(),
});

export type UpdateMoneyMessage = z.infer<typeof UpdateMoneyMessageSchema>;
