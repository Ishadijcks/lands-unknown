import { z } from "zod";
import { RequestType } from "common/connection/requests/RequestType";
import { BaseRequestSchema } from "common/connection/requests/BaseRequest";
import { LocationHridSchema } from "common/game/worldmap/LocationHrid";

export const ScheduleActivityRequestSchema = BaseRequestSchema.extend({
  type: z.literal(RequestType.ScheduleActivity),
  location: LocationHridSchema,
  index: z.number().min(0).int(),
  repetitions: z.number().min(0).int(),
}).strict();

export type ScheduleActivityRequest = z.infer<typeof ScheduleActivityRequestSchema>;
