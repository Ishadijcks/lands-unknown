import { ActivityQueue } from "common/game/activities/ActivityQueue";
import type { ActionHrid } from "common/content/ActionHrid";
import type { ActionDetail } from "common/game/actions/ActionDetail";
import type { ActivityHrid } from "common/content/ActivityHrid";
import type { ActivityDetail } from "common/game/activities/ActivityDetail";
import type { CharacterAction } from "common/game/actions/CharacterAction";
import type { CharacterActivity } from "common/game/activities/CharacterActivity";
import type { ScheduledActivity } from "common/game/activities/ScheduledActivity";

export class ClientActivityQueue extends ActivityQueue {
  private _queue: ScheduledActivity[] = [];
  private _currentAction: CharacterAction | null = null;
  private _currentActivity: CharacterActivity | null = null;

  constructor(
    actionDetailMap: Record<ActionHrid, ActionDetail>,
    activityDetailMap: Record<ActivityHrid, ActivityDetail>
  ) {
    super(actionDetailMap, activityDetailMap);
  }

  public updateQueue(
    queue: ScheduledActivity[],
    currentAction: CharacterAction | null,
    currentActivity: CharacterActivity | null
  ) {
    this._queue = queue;
    this._currentAction = currentAction;
    this._currentActivity = currentActivity;
  }

  get queue(): ScheduledActivity[] {
    return this._queue;
  }

  get currentAction(): CharacterAction | null {
    return this._currentAction;
  }

  get currentActivity(): CharacterActivity | null {
    return this._currentActivity;
  }
}
