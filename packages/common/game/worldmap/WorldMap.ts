import { LocationHrid } from "common/game/worldmap/LocationHrid";
import { LocationDetail } from "common/game/worldmap/LocationDetail";
import { RoadHrid } from "common/game/worldmap/RoadHrid";
import { RoadDetail } from "common/game/worldmap/RoadDetail";

export class WorldMap {
  private readonly _locationDetailMap: Record<LocationHrid, LocationDetail>;
  private readonly _roadDetailMap: Record<RoadHrid, RoadDetail>;

  private readonly _locations: LocationDetail[];

  constructor(locationDetailMap: Record<LocationHrid, LocationDetail>, roadDetailMap: Record<RoadHrid, RoadDetail>) {
    this._locationDetailMap = locationDetailMap;
    this._roadDetailMap = roadDetailMap;

    this._locations = Object.values(this._locationDetailMap);
  }

  get locations(): LocationDetail[] {
    return this._locations;
  }

  get locationDetailMap(): Record<LocationHrid, LocationDetail> {
    return this._locationDetailMap;
  }

  get roadDetailMap(): Record<RoadHrid, RoadDetail> {
    return this._roadDetailMap;
  }
}
