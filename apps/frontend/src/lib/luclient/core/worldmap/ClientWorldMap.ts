import { WorldMap } from "common/game/worldmap/WorldMap";
import type { LocationHrid } from "common/game/worldmap/LocationHrid";
import type { LocationDetail } from "common/game/worldmap/LocationDetail";
import type { RoadHrid } from "common/game/worldmap/RoadHrid";
import type { RoadDetail } from "common/game/worldmap/RoadDetail";

export class ClientWorldMap extends WorldMap {
  // private readonly _characterLocation: any;

  constructor(locationDetailMap: Record<LocationHrid, LocationDetail>, roadDetailMap: Record<RoadHrid, RoadDetail>) {
    super(locationDetailMap, roadDetailMap);
  }
}
