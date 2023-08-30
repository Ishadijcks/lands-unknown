import * as tutorial from "content/data/worldmap/maps/tutorial/tutorial.json";
import type { TiledMap } from "common/game/worldmap/tiled/TiledMap";

export class TiledMapRepository {
  public static getAll(): { name: string; tiledMap: TiledMap }[] {
    return ["tutorial"].map((id) => {
      return {
        name: id,
        tiledMap: this.getTiledMap(id),
      };
    });
  }

  public static getTiledMap(id: string): TiledMap {
    switch (id) {
      case "tutorial":
        return tutorial as TiledMap;
      default:
        return tutorial as TiledMap;
    }
  }
}
