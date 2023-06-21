// This file is generated from create-enums.ts, please do not edit it directly
import { z } from "zod";
import { itemHrids } from "common/content/hrids";

export const ItemHridSchema = z.enum(itemHrids);
export type ItemHrid = z.infer<typeof ItemHridSchema>;
