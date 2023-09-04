import { Activity } from "common/game/activities/Activity";
import { TravelActivityDetail } from "common/game/activities/ActivityDetail";
import { ActionHrid } from "common/game/actions/ActionHrid";

export class TravelActivity implements Activity {
  detail: TravelActivityDetail;
  repetitions = 0;

  private _isFinished = false;
  private _index = 0;

  constructor(detail: TravelActivityDetail) {
    this.detail = detail;
  }

  private _completeSequence(): void {
    this._isFinished = true;
  }

  getNext(): ActionHrid {
    if (this._index >= this.detail.roads.length - 1) {
      this._completeSequence();
    }
    const nextAction = this.detail.roads[this._index];
    this._index++;
    // TODO(@Isha): Ehh not sure
    return ("/action" + nextAction) as unknown as ActionHrid;
  }

  isFinished(): boolean {
    return this._isFinished;
  }
}
