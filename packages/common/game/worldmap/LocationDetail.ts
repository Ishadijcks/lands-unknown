import { z } from "zod";
import { LocationHrid } from "common/game/worldmap/LocationHrid";
import { NpcHrid } from "common/game/npcs/NpcHrid";
import { FacilityHrid } from "common/game/worldmap/FacilityHrid";
import { ActivityHridSchema } from "common/game/activities/ActivityHrid";

const LocationDetailSchema = z.object({
  hrid: z.nativeEnum(LocationHrid),
  name: z.string().optional(),

  npcs: z.array(z.nativeEnum(NpcHrid)),
  facilities: z.array(z.nativeEnum(FacilityHrid)),
  activities: z.array(ActivityHridSchema),
  // shops: z.array(z.nativeEnum(NpcHrid)),
});

export type LocationDetail = z.infer<typeof LocationDetailSchema>;
