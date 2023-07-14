import { TiledLayer } from "common/game/worldmap/tiled/TiledLayer";

export interface TiledMap {
  compressionlevel: number;
  editorsettings?: {
    export: {
      target: string;
    };
  };
  height: number;
  infinite: boolean;
  layers: TiledLayer[];
  nextlayerid: number;
  nextobjectid: number;
  orientation: string;
  renderorder: string;
  tiledversion: string;
  tileheight: number;
  tilesets: {
    firstgid: number;
    source: string;
  }[];
  tilewidth: number;
  type: string;
  version: string;
  width: number;
}
