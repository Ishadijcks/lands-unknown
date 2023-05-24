import { z } from "zod";
import { ItemHrid } from "common/game/items/ItemHrid";

export const ItemAmountSchema = z.object({
  hrid: z.nativeEnum(ItemHrid),
  amount: z.number().min(1).int(),
});

export type ItemAmount = z.infer<typeof ItemAmountSchema>;
