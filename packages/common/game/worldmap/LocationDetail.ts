import { z } from "zod";
import { LocationHridSchema } from "common/game/worldmap/LocationHrid";
import { NpcHrid } from "common/game/npcs/NpcHrid";
import { FacilityHrid } from "common/game/worldmap/FacilityHrid";
import { ActivityHridSchema } from "common/game/activities/ActivityHrid";

export const LocationDetailSchema = z
  .object({
    hrid: LocationHridSchema,
    name: z.string(),

    npcs: z.array(z.nativeEnum(NpcHrid)).default([]),
    facilities: z.array(z.nativeEnum(FacilityHrid)).default([]),
    activities: z.array(ActivityHridSchema).default([]),
    // shops: z.array(z.nativeEnum(NpcHrid)),
  })
  .strict();

export type LocationDetail = z.infer<typeof LocationDetailSchema>;
export type LocationDetailInput = z.input<typeof LocationDetailSchema>;
