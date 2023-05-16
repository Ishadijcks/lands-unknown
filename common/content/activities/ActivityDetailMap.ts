import { ActivityHrid } from "common/game/activities/ActivityHrid";
import type { ActivityDetail } from "common/game/activities/ActivityDetail";
import { ActionHrid } from "common/game/actions/ActionHrid";
import { ActivityType } from "common/game/activities/ActivityType";

export const activityDetailMap: Record<ActivityHrid, ActivityDetail> = {
  [ActivityHrid.ExploreForest]: {
    name: "Explore Forest",
    hrid: ActivityHrid.ExploreForest,
    actions: [
      { hrid: ActionHrid.GatherWood, weight: 10 },
      { hrid: ActionHrid.GatherLeaf, weight: 1 },
    ],
    type: ActivityType.Forest,
  },
  [ActivityHrid.Fish]: {
    name: "Fishing Spot",
    hrid: ActivityHrid.Fish,
    actions: [
      { hrid: ActionHrid.CatchShrimp, weight: 10 },
      { hrid: ActionHrid.CatchPearl, weight: 1 },
    ],
    type: ActivityType.Sea,
  },
};
