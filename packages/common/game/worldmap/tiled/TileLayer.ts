import { TiledLayer } from "common/game/worldmap/tiled/TiledLayer";

/**
 * The layer which holds actual tile data
 */
export interface TileLayer extends TiledLayer {
  data: number[];
}
