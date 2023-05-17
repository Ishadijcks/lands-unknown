import type { ActivityHrid } from "common/game/activities/ActivityHrid";
import type { ActivityDetail } from "common/game/activities/ActivityDetail";
import type { ActionHrid } from "common/game/actions/ActionHrid";
import type { ActionDetail } from "common/game/actions/ActionDetail";

export class ActivityQueue {
  private readonly _actionDetailMap: Record<ActionHrid, ActionDetail>;
  private readonly _activityDetailMap: Record<ActivityHrid, ActivityDetail>;

  constructor(
    actionDetailMap: Record<ActionHrid, ActionDetail>,
    activityDetailMap: Record<ActivityHrid, ActivityDetail>
  ) {
    this._actionDetailMap = actionDetailMap;
    this._activityDetailMap = activityDetailMap;
  }

  get actionDetailMap(): Record<ActionHrid, ActionDetail> {
    return this._actionDetailMap;
  }

  get activityDetailMap(): Record<ActivityHrid, ActivityDetail> {
    return this._activityDetailMap;
  }
}
