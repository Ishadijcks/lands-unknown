import { z } from "zod";
import { ItemHridSchema } from "common/game/items/ItemHrid";

export const ItemAmountSchema = z.object({
  hrid: ItemHridSchema,
  amount: z.number().min(1).int(),
});

export type ItemAmount = z.infer<typeof ItemAmountSchema>;
