import { RoadDetail } from "common/game/worldmap/RoadDetail";
import { TiledMap } from "common/game/worldmap/tiled/TiledMap";
import { ObjectGroup } from "common/game/worldmap/tiled/ObjectGroup";
import { RoadHrid } from "common/game/worldmap/RoadHrid";
import { WorldPosition } from "common/game/worldmap/tiled/WorldPosition";
import { ActionDetailInput } from "common/game/actions/ActionDetail";
import { ActionHrid } from "common/game/actions/ActionHrid";

export class TiledParser {
  private _tiledMaps: TiledMap[];

  constructor(tiledMaps: TiledMap[]) {
    this._tiledMaps = tiledMaps;
  }

  /**
   * This method parses the roads and creates actions out of them
   * It also provides a list of location hrids it found, which should exist
   */
  public parse(): { roads: RoadDetail[]; locations: string[]; actions: ActionDetailInput[] } {
    const roads = this.parseRoads();
    const roadActions: ActionDetailInput[] = roads.map((road) => {
      const baseDuration = road.speedFactor * road.path.length;
      return {
        hrid: ("/action" + road.hrid) as ActionHrid,
        name: `Travel to ${road.to}`,
        icon: "travel",
        destination: road.to,
        baseDuration: baseDuration,
        experienceRewards: [{ value: baseDuration, skillHrid: "/skills/agility" }],
      };
    });
    return {
      locations: this.parseLocations(),
      roads: roads,
      actions: roadActions,
    };
  }

  private parseLocations(): string[] {
    return this._tiledMaps.flatMap((map) => {
      const locationLayer = map.layers.find((layer) => layer.name === "Roads") as ObjectGroup;
      if (!locationLayer) {
        return [];
      }
      return locationLayer.objects
        .filter((object) => object.point)
        .map((object) => {
          return object?.properties?.find((p) => p.name === "hrid")?.value;
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
            hrid: `/road${from}/to${to}` as RoadHrid,
            from: from,
            to: to,
            path: path,
            speedFactor: speedFactor,
          };
          const roadDetailReverse: RoadDetail = {
            hrid: `/road${to}/to${from}` as RoadHrid,
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
