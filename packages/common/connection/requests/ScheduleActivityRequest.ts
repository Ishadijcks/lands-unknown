import { z } from "zod";
import { RequestType } from "common/connection/requests/RequestType";
import { BaseRequestSchema } from "common/connection/requests/BaseRequest";
import { ActivityHrid } from "common/game/activities/ActivityHrid";
import { LocationHrid } from "common/game/worldmap/LocationHrid";

export const ScheduleActivityRequestSchema = BaseRequestSchema.extend({
  type: z.literal(RequestType.ScheduleActivity),
  location: z.nativeEnum(LocationHrid),
  index: z.number().min(0).int(),
  repetitions: z.number().min(0).int(),
});

export type ScheduleActivityRequest = z.infer<typeof ScheduleActivityRequestSchema>;
