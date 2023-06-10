import type { ActivityHrid } from "common/content/ActivityHrid";

export interface ScheduledActivity {
  hrid: ActivityHrid;
  repetitions: number;
}
