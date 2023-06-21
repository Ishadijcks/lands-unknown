import { z } from "zod";
import { itemHrids } from "common/content/generated/hrids";

export const ItemHridSchema = z.enum(itemHrids);
export type ItemHrid = z.infer<typeof ItemHridSchema>;
