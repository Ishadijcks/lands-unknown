import { z } from "zod";
import { FacilityTypeHrid } from "common/game/worldmap/FacilityTypeHrid";
import { ActionHridSchema } from "common/game/actions/ActionHrid";

const FacilityTypeDetailSchema = z.object({
  hrid: z.nativeEnum(FacilityTypeHrid),
  name: z.string(),
  actions: z.array(ActionHridSchema),
});

export type FacilityTypeDetail = z.infer<typeof FacilityTypeDetailSchema>;
