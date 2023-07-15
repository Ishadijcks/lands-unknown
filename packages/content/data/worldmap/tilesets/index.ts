import grass from "./grass.json";
import house from "./house.json";
import fence from "./fence.json";
import scenery from "./scenery.json";

export const TileSets = {
  grass: grass,
  fence: fence,
  scenery: scenery,
  house: house,
};

import { default as grassImg } from "./grass.png";
import { default as fenceImg } from "./fence.png";
import { default as houseImg } from "./house.png";
import { default as sceneryImg } from "./scenery.png";

type TileSetExportType = typeof TileSets;

export const Images: TileSetExportType = {
  grass: grassImg,
  fence: fenceImg,
  scenery: sceneryImg,
  house: houseImg,
};
