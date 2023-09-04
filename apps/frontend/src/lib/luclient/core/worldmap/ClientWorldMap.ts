import { WorldMap } from "common/game/worldmap/WorldMap";
import { type LocationHrid, LocationHridSchema } from "common/game/worldmap/LocationHrid";
import type { LocationDetail } from "common/game/worldmap/LocationDetail";
import type { RoadHrid } from "common/game/worldmap/RoadHrid";
import type { RoadDetail } from "common/game/worldmap/RoadDetail";
import { SimpleEventDispatcher } from "strongly-typed-events";

export class ClientWorldMap extends WorldMap {
  private _characterLocation: LocationHrid;

  private _onLocationChanged = new SimpleEventDispatcher<LocationDetail>();

  public get onLocationChanged() {
    return this._onLocationChanged.asEvent();
  }

  constructor(locationDetailMap: Record<LocationHrid, LocationDetail>, roadDetailMap: Record<RoadHrid, RoadDetail>) {
    super(locationDetailMap, roadDetailMap);
    this._characterLocation = LocationHridSchema.enum["tutorial/pigs"];
  }

  public updateCharacterLocation(location: LocationHrid, notify = true): void {
    if (notify && this._characterLocation !== location) {
      this._onLocationChanged.dispatch(this.locationDetailMap[location]);
    }
    this._characterLocation = location;
  }

  get characterLocation(): LocationHrid {
    return this._characterLocation;
  }
}
