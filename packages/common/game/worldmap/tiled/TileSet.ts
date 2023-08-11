export interface TileSet {
  columns: number;
  editorsettings?: {
    export: {
      format: string;
      target: string;
    };
  };
  image: string;
  imageheight: number;
  imagewidth: number;
  margin: number;
  name: string;
  spacing: number;
  tilecount: number;
  tiledversion: string;
  tileheight: number;
  tiles?: {
    id: number;
    probability: number;
  }[];
  tilewidth: number;
  type: string;
  version: string;
}
