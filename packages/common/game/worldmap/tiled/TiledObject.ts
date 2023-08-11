import { ObjectProperty } from "common/game/worldmap/tiled/ObjectProperty";
import { WorldPosition } from "common/game/worldmap/tiled/WorldPosition";

export interface TiledObject {
  height: number;
  id: number;
  name: string;
  properties?: ObjectProperty[];
  text?: {
    color?: string;
    fontfamily?: string;
    italic?: boolean;
    pixelsize?: number;
    halign?: string;
    text: string;
    valign?: string;
    wrap?: boolean;
  };
  point?: boolean;
  polyline?: WorldPosition[];
  rotation: number;
  type: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
}
