import { RoadDetail } from "common/game/worldmap/RoadDetail";
import { TiledMap } from "common/game/worldmap/tiled/TiledMap";
import { ObjectGroup } from "common/game/worldmap/tiled/ObjectGroup";
import { RoadHrid } from "common/game/worldmap/RoadHrid";
import { WorldPosition } from "common/game/worldmap/tiled/WorldPosition";
import { LocationDetail } from "common/game/worldmap/LocationDetail";

export class TiledParser {
  private _tiledMaps: TiledMap[];

  constructor(tiledMaps: TiledMap[]) {
    this._tiledMaps = tiledMaps;
  }

  public parse(): { roads: RoadDetail[]; locations: LocationDetail[] } {
    return {
      locations: this.parseLocations(),
      roads: this.parseRoads(),
    };
  }

  private parseLocations(): LocationDetail[] {
    return this._tiledMaps.flatMap((map) => {
      const locationLayer = map.layers.find((layer) => layer.name === "Roads") as ObjectGroup;
      if (!locationLayer) {
        return [];
      }
      return locationLayer.objects
        .filter((object) => object.point)
        .map((object) => {
          const hrid = object?.properties?.find((p) => p.name === "hrid")?.value;
          const name = object?.properties?.find((p) => p.name === "name")?.value;
          const locationDetail: LocationDetail = {
            hrid,
            name,
          };
          return locationDetail;
        });
    });
  }

  private parseRoads(): RoadDetail[] {
    return this._tiledMaps.flatMap((map) => {
      const roadLayer = map.layers.find((layer) => layer.name === "Roads") as ObjectGroup;
      if (!roadLayer) {
        return [];
      }
      return roadLayer.objects
        .filter((object) => object.polyline)
        .flatMap((object) => {
          const from = object?.properties?.find((p) => p.name === "from")?.value;
          const to = object?.properties?.find((p) => p.name === "to")?.value;
          const speedFactor = object?.properties?.find((p) => p.name === "speedFactor")?.value ?? 1;
          const path: WorldPosition[] = object?.polyline as WorldPosition[];
          const roadDetail: RoadDetail = {
            hrid: `/road/${from}-${to}` as RoadHrid,
            from: from,
            to: to,
            path: path,
            speedFactor: speedFactor,
          };
          const roadDetailReverse: RoadDetail = {
            hrid: `/road/${to}-${from}` as RoadHrid,
            from: to,
            to: from,
            path: [...path].reverse(),
            speedFactor: speedFactor,
          };
          return [roadDetail, roadDetailReverse];
        });
    });
  }
}
