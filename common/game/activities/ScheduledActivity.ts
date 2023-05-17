import type { ActivityHrid } from "common/game/activities/ActivityHrid";

export interface ScheduledActivity {
  hrid: ActivityHrid;
  repetitions: number;
}
