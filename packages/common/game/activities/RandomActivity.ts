import { RandomActivityDetail } from "common/game/activities/ActivityDetail";
import { ActionHrid } from "common/content/ActionHrid";
import { Activity } from "common/game/activities/Activity";

export class RandomActivity implements Activity {
  detail: RandomActivityDetail;
  repetitions: number;

  constructor(detail: RandomActivityDetail, repetitions: number) {
    this.detail = detail;
    this.repetitions = repetitions;
  }

  public getNext(): ActionHrid {
    this.repetitions--;

    // TODO(@Isha): Use Random and account for weight
    const index = Math.floor(Math.random() * this.detail.actions.length);
    return this.detail.actions[index].hrid;
  }

  public isFinished(): boolean {
    return this.repetitions === 0;
  }
}
