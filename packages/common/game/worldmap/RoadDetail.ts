import { z } from "zod";
import { RoadHridSchema } from "common/game/worldmap/RoadHrid";
import { LocationHridSchema } from "common/game/worldmap/LocationHrid";
import { WorldPositionSchema } from "common/game/worldmap/tiled/WorldPosition";

export const RoadDetailSchema = z
  .object({
    hrid: RoadHridSchema,
    // name: z.string().optional(),
    from: LocationHridSchema,
    to: LocationHridSchema,
    path: z.array(WorldPositionSchema),
    speedFactor: z.number().positive(),
  })
  .strict();

export type RoadDetail = z.infer<typeof RoadDetailSchema>;
