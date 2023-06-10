import { ActivityDetail } from "common/game/activities/ActivityDetail";
import { ActionHrid } from "common/content/ActionHrid";

export interface Activity {
  detail: ActivityDetail;
  repetitions: number;

  getNext(): ActionHrid;

  isFinished(): boolean;
}
