import { FacilityTypeHrid } from "common/game/worldmap/FacilityTypeHrid";
import { FacilityTypeDetail } from "common/game/worldmap/FacilityTypeDetail";

export const facilityTypeDetailMap: Record<FacilityTypeHrid, FacilityTypeDetail> = {
  [FacilityTypeHrid.Anvil]: {
    hrid: FacilityTypeHrid.Anvil,
    name: "Anvil",
    actions: [],
  },
  [FacilityTypeHrid.Oven]: {
    hrid: FacilityTypeHrid.Oven,
    name: "Oven",
    actions: [],
  },
  [FacilityTypeHrid.Furnace]: {
    hrid: FacilityTypeHrid.Furnace,
    name: "Furnace",
    actions: [],
  },
};
