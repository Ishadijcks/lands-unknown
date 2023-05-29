import { LocationHrid } from "common/game/worldmap/LocationHrid";
import { LocationDetail } from "common/game/worldmap/LocationDetail";
import { NpcHrid } from "common/game/npcs/NpcHrid";
import { ActivityHrid } from "common/game/activities/ActivityHrid";
import { FacilityHrid } from "common/game/worldmap/FacilityHrid";

export const locationDetailMap: Record<LocationHrid, LocationDetail> = {
  [LocationHrid.Forest]: {
    hrid: LocationHrid.Forest,
    name: "The Forest",
    npcs: [NpcHrid.Npc1],
    activities: [ActivityHrid.ExploreForest],
    facilities: [],
  },
  [LocationHrid.Lake]: {
    hrid: LocationHrid.Lake,
    name: "The Lake",
    npcs: [NpcHrid.Npc2],
    activities: [ActivityHrid.Fish],
    facilities: [],
  },
  [LocationHrid.Town]: {
    hrid: LocationHrid.Town,
    name: "The Town",
    npcs: [NpcHrid.Npc3],
    activities: [],
    facilities: [FacilityHrid.ExampleAnvil],
  },
};
