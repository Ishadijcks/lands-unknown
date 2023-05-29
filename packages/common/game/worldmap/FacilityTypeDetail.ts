import { z } from "zod";
import { FacilityTypeHrid } from "common/game/worldmap/FacilityTypeHrid";
import { ActionHrid } from "common/game/actions/ActionHrid";

const FacilityTypeDetailSchema = z.object({
  hrid: z.nativeEnum(FacilityTypeHrid),
  name: z.string(),
  actions: z.array(z.nativeEnum(ActionHrid)),
});

export type FacilityTypeDetail = z.infer<typeof FacilityTypeDetailSchema>;
