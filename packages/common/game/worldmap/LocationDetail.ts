import { z } from "zod";
import { LocationHridSchema } from "common/game/worldmap/LocationHrid";
import { NpcHrid } from "common/game/npcs/NpcHrid";
import { FacilityHrid } from "common/game/worldmap/FacilityHrid";
import { ActivityHridSchema } from "common/game/activities/ActivityHrid";

export const LocationDetailSchema = z
  .object({
    hrid: LocationHridSchema,
    name: z.string().optional(),

    npcs: z.array(z.nativeEnum(NpcHrid)).optional(),
    facilities: z.array(z.nativeEnum(FacilityHrid)).optional(),
    activities: z.array(ActivityHridSchema).optional(),
    // shops: z.array(z.nativeEnum(NpcHrid)),
  })
  .strict();

export type LocationDetail = z.infer<typeof LocationDetailSchema>;
