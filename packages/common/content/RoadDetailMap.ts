import { RoadHrid } from "common/game/worldmap/RoadHrid";
import { RoadDetail } from "common/game/worldmap/RoadDetail";

export const roadDetailMap: Record<RoadHrid, RoadDetail> = {
  [RoadHrid.Road1]: {
    hrid: RoadHrid.Road1,
    speedFactor: 1,
  },
  [RoadHrid.Road2]: {
    hrid: RoadHrid.Road2,
    speedFactor: 1,
  },
  [RoadHrid.Road3]: {
    hrid: RoadHrid.Road3,
    speedFactor: 1,
  },
};
