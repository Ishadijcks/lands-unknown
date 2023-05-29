import { FacilityDetail } from "common/game/worldmap/FacilityDetail";
import { FacilityHrid } from "common/game/worldmap/FacilityHrid";
import { FacilityTypeHrid } from "common/game/worldmap/FacilityTypeHrid";

export const facilityDetailMap: Record<FacilityHrid, FacilityDetail> = {
  [FacilityHrid.ExampleAnvil]: {
    hrid: FacilityHrid.ExampleAnvil,
    name: "Example Anvil",
    type: FacilityTypeHrid.Anvil,
  },
};
