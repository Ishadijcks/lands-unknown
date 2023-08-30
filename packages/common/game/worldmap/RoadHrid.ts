import { z } from "zod";
import { roadHrids } from "common/content/generated/hrids";

export const RoadHridSchema = z.enum(roadHrids);
export type RoadHrid = z.infer<typeof RoadHridSchema>;
