import * as tutorial from "content/data/worldmap/maps/tutorial/tutorial.json";
import type { TiledMap } from "common/game/worldmap/tiled/TiledMap";

export class WorldMapRepository {
  public static getWorldMap(id: string): TiledMap {
    switch (id) {
      case "tutorial":
        return tutorial as TiledMap;
      default:
        return tutorial as TiledMap;
    }
  }
}
