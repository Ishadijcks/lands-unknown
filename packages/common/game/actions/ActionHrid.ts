import { z } from "zod";
import { actionHrids } from "common/content/generated/hrids";

export const ActionHridSchema = z.enum(actionHrids);
export type ActionHrid = z.infer<typeof ActionHridSchema>;
