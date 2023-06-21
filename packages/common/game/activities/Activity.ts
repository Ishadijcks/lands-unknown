import { ActivityDetail } from "common/game/activities/ActivityDetail";
import { ActionHrid } from "common/game/actions/ActionHrid";

export interface Activity {
  detail: ActivityDetail;
  repetitions: number;

  getNext(): ActionHrid;

  isFinished(): boolean;
}
