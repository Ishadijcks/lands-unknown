import { ActivityHrid } from "common/game/activities/ActivityHrid";
import type { ActivityDetail } from "common/game/activities/ActivityDetail";
import { ActionHrid } from "common/game/actions/ActionHrid";
import { ActivityTheme } from "common/game/activities/ActivityTheme";
import { ActivityType } from "common/game/activities/ActivityType";

export const activityDetailMap: Record<ActivityHrid, ActivityDetail> = {
  [ActivityHrid.ExploreForest]: {
    name: "Explore Forest",
    hrid: ActivityHrid.ExploreForest,
    type: ActivityType.Randomized,
    actions: [
      { hrid: ActionHrid.GatherWood, weight: 10 },
      { hrid: ActionHrid.GatherLeaf, weight: 1 },
    ],
    theme: ActivityTheme.Forest,
  },
  [ActivityHrid.Fish]: {
    name: "Fishing Spot",
    hrid: ActivityHrid.Fish,
    type: ActivityType.Linear,
    actions: [ActionHrid.CatchShrimp, ActionHrid.CatchPearl],
    theme: ActivityTheme.Sea,
  },
};
