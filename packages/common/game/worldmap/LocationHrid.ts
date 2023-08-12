import { z } from "zod";
import { locationHrids } from "common/content/generated/hrids";

export const LocationHridSchema = z.enum(locationHrids);
export type LocationHrid = z.infer<typeof LocationHridSchema>;
