import { z } from "zod";
import { RequestType } from "common/connection/requests/RequestType";
import { BaseRequestSchema } from "common/connection/requests/BaseRequest";
import { LocationHridSchema } from "common/game/worldmap/LocationHrid";
import { RoadHridSchema } from "common/game/worldmap/RoadHrid";

export const ScheduleTravelRequestSchema = BaseRequestSchema.extend({
  type: z.literal(RequestType.ScheduleTravel),
  location: LocationHridSchema,
  roads: z.array(RoadHridSchema),
}).strict();

export type ScheduleTravelRequest = z.infer<typeof ScheduleTravelRequestSchema>;
