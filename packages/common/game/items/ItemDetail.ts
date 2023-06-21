import { z } from "zod";
import { ItemHridSchema } from "common/game/items/ItemHrid";

export const ItemDetailSchema = z.object({
  hrid: ItemHridSchema,
  icon: z.string(),
  name: z.string(),
  description: z.string(),
});

export type ItemDetail = z.infer<typeof ItemDetailSchema>;
export type ItemDetailInput = z.input<typeof ItemDetailSchema>;
