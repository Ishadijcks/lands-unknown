import { z } from "zod";
import { ItemHrid } from "common/game/items/ItemHrid";

export const ItemDetailSchema = z.object({
  hrid: z.nativeEnum(ItemHrid),
  icon: z.string(),
  name: z.string(),
  description: z.string(),
});

export type ItemDetail = z.infer<typeof ItemDetailSchema>;
