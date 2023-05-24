import type { ActivityType } from "common/game/activities/ActivityType";

export interface CharacterActivity {
  description: string;
  repetitions: number;
  type: ActivityType;
}
