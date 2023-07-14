import { LayerType } from "common/game/worldmap/tiled/LayerType";

/**
 * A common interface which all layers created in Tiled must share
 */
export interface TiledLayer {
  height: number;
  id: number;
  name: string;
  opacity: number;
  type: LayerType;
  visible: true;
  width: number;
  x: number;
  y: number;
}
