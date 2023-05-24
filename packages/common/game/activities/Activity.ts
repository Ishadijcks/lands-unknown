import { ActivityDetail } from "common/game/activities/ActivityDetail";
import { ActionHrid } from "common/game/actions/ActionHrid";

export class Activity {
  detail: ActivityDetail;
  repetitions: number;

  constructor(detail: ActivityDetail, repetitions: number) {
    this.detail = detail;
    this.repetitions = repetitions;
  }

  public getNext(): ActionHrid {
    this.repetitions--;

    // TODO(@Isha): Use Random and account for weight
    const index = Math.floor(Math.random() * this.detail.actions.length);
    return this.detail.actions[index].hrid;
  }

  public get isFinished(): boolean {
    return this.repetitions === 0;
  }
}
