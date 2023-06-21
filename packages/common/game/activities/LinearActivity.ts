import { Activity } from "common/game/activities/Activity";
import { LinearActivityDetail } from "common/game/activities/ActivityDetail";
import { ActionHrid } from "common/game/actions/ActionHrid";

export class LinearActivity implements Activity {
  detail: LinearActivityDetail;
  repetitions: number;

  private _index = 0;

  constructor(detail: LinearActivityDetail, repetitions: number) {
    this.detail = detail;
    this.repetitions = repetitions;
  }

  private _resetSequence(): void {
    console.log("resetting sequence");
    this._index = 0;
    this.repetitions--;
  }

  getNext(): ActionHrid {
    if (this._index >= this.detail.actions.length) {
      this._resetSequence();
    }
    const nextAction = this.detail.actions[this._index];
    this._index++;
    console.log(nextAction);
    return nextAction;
  }

  isFinished(): boolean {
    return this.repetitions === 0;
  }
}
