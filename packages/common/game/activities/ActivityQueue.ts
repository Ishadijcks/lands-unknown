import type { ActivityHrid } from "common/game/activities/ActivityHrid";
import type { ActivityDetail } from "common/game/activities/ActivityDetail";
import type { ActionHrid } from "common/game/actions/ActionHrid";
import type { ActionDetail } from "common/game/actions/ActionDetail";
import { ActivityType } from "common/game/activities/ActivityType";
import { RandomActivity } from "common/game/activities/RandomActivity";
import { LinearActivity } from "common/game/activities/LinearActivity";
import { Activity } from "common/game/activities/Activity";

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

  public getActivityFromDetail(detail: ActivityDetail, repetitions: number): Activity | null {
    switch (detail.type) {
      case ActivityType.Randomized:
        return new RandomActivity(detail, repetitions);
      case ActivityType.Linear:
        return new LinearActivity(detail, repetitions);
      default:
        return null;
    }
  }

  get actionDetailMap(): Record<ActionHrid, ActionDetail> {
    return this._actionDetailMap;
  }

  get activityDetailMap(): Record<ActivityHrid, ActivityDetail> {
    return this._activityDetailMap;
  }
}
