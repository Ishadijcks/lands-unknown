import { z } from "zod";
import { RequestType } from "common/connection/requests/RequestType";
import { BaseRequestSchema } from "common/connection/requests/BaseRequest";
import { LocationHrid } from "common/game/worldmap/LocationHrid";

export const ScheduleTravelRequestSchema = BaseRequestSchema.extend({
  type: z.literal(RequestType.ScheduleTravel),
  location: z.nativeEnum(LocationHrid),
}).strict();

export type ScheduleTravelRequest = z.infer<typeof ScheduleTravelRequestSchema>;
