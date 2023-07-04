import { z } from "zod";
import { FacilityHrid } from "common/game/worldmap/FacilityHrid";
import { FacilityTypeHrid } from "common/game/worldmap/FacilityTypeHrid";

const FacilityDetailSchema = z
  .object({
    hrid: z.nativeEnum(FacilityHrid),
    type: z.nativeEnum(FacilityTypeHrid),
    name: z.string(),
  })
  .strict();

export type FacilityDetail = z.infer<typeof FacilityDetailSchema>;
