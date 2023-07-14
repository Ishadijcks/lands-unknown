import { z } from "zod";
import { RoadHrid } from "common/game/worldmap/RoadHrid";

const RoadDetailSchema = z
  .object({
    hrid: z.nativeEnum(RoadHrid),
    name: z.string().optional(),
    speedFactor: z.number().positive(),
  })
  .strict();

export type RoadDetail = z.infer<typeof RoadDetailSchema>;
