import { CharacterFeature } from "backend/character/CharacterFeature";
import { ActivityHrid } from "common/content/ActivityHrid";
import { Action } from "common/game/actions/Action";
import { Activity } from "common/game/activities/Activity";
import { ScheduledActivity } from "common/game/activities/ScheduledActivity";
import { ActionDetail } from "common/game/actions/ActionDetail";
import { ActivityDetail } from "common/game/activities/ActivityDetail";

export class CharacterActivityQueue extends CharacterFeature {
  private _queue: ScheduledActivity[] = [];

  private _currentAction: Action | null = null;
  private _currentActivity: Activity | null = null;

  constructor() {
    super("activity-queue");
  }

  public update(delta: number) {
    // TODO(@Isha): Clean this if mess up
    if (!this._currentAction && !this._currentActivity && this._queue.length === 0) {
      return;
    }

    if (this._currentAction) {
      // If we have an action, perform it
      this._currentAction.perform(delta);

      // If it's finished, clear it and we're done
      if (!this._currentAction.isFinished) {
        this.sendActivityQueueMessage();
        return;
      }

      this.completeAction(this._currentAction.detail);

      this._currentAction = null;
      if (this._currentActivity?.isFinished()) {
        this._clearCurrentActivity();
      }
    }

    // If we have no activity, try to grab the next one from the queue
    if (!this._currentActivity) {
      if (this._queue.length === 0) {
        this.sendActivityQueueMessage();
        return;
      }
      const scheduledActivity = this._queue.shift();
      if (!scheduledActivity) {
        console.warn("Unshifted undefined scheduledActivity", this._queue, scheduledActivity);
        return;
      }
      const nextActivityDetail = this._game.activityQueue.activityDetailMap[scheduledActivity.hrid];
      this._setCurrentActivity(nextActivityDetail, scheduledActivity.repetitions);
    }

    if (!this._currentActivity) {
      console.warn("Current Activity is null");
      return;
    }

    const nextActionHrid = this._currentActivity.getNext();
    const action = this._game.activityQueue.actionDetailMap[nextActionHrid];
    this._currentAction = new Action(action);

    this.sendActivityQueueMessage();
  }

  private completeAction(detail: ActionDetail) {
    // Gain rewards
    detail.experienceRewards.forEach((reward) => {
      this._character.skills.gainExp(reward.skillHrid, reward.value);
    });

    if (detail.outputItems != undefined) {
      this._character.inventory.gainItemAmounts(detail.outputItems);
    }
  }

  private sendActivityQueueMessage(): void {
    this._character.sendActivityQueueUpdated(this._queue, this._currentAction, this._currentActivity);
  }

  private _clearCurrentActivity(): void {
    this._currentActivity = null;
  }

  private _setCurrentActivity(detail: ActivityDetail, repetitions: number) {
    if (this._currentActivity) {
      console.warn("Tried to set current activity but it is already", this._currentActivity);
    }
    this._currentActivity = this._game.activityQueue.getActivityFromDetail(detail, repetitions);

    this.sendActivityQueueMessage();
  }

  scheduleActivity(hrid: ActivityHrid, repetitions: number = 1) {
    this._queue.push({ hrid, repetitions });
  }

  // TODO(@Isha): Implement
  load(data: any): void {}

  save(): any {}
}
