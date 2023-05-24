import { ActionDetail } from "common/game/actions/ActionDetail";

export class Action {
  detail: ActionDetail;

  currentProgress: number = 0;

  constructor(detail: ActionDetail) {
    this.detail = detail;
  }

  public get isFinished(): boolean {
    return this.currentProgress >= this.detail.baseDuration;
  }

  perform(delta: number) {
    this.currentProgress += delta;
  }
}
