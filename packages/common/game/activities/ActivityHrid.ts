// This file is generated from create-enums.ts, please do not edit it directly
import { z } from "zod";
import { activityHrids } from "common/content/generated/hrids";

export const ActivityHridSchema = z.enum(activityHrids);
export type ActivityHrid = z.infer<typeof ActivityHridSchema>;
