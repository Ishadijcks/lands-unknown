import { LocationHrid } from "common/game/worldmap/LocationHrid";

/**
 * Captures the basic attributes of a tiled ClickBox.
 */
export interface ClickBox {
  x: number;
  y: number;
  width: number;
  height: number;
  hrid: LocationHrid;
}
