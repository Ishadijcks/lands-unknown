import { TiledLayer } from "common/game/worldmap/tiled/TiledLayer";
import { TiledObject } from "common/game/worldmap/tiled/TiledObject";

/**
 * A layer containing objects
 */
export interface ObjectGroup extends TiledLayer {
  draworder: string;
  objects: TiledObject[];
}
