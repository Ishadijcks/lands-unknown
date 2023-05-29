import type { ActivityTheme } from "common/game/activities/ActivityTheme";

export interface CharacterActivity {
  description: string;
  repetitions: number;
  theme: ActivityTheme;
}
