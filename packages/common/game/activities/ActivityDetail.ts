import { z } from "zod";
import { ActivityHrid } from "common/game/activities/ActivityHrid";
import { ActionHrid } from "common/game/actions/ActionHrid";
import { ActivityTheme } from "common/game/activities/ActivityTheme";
import { ActivityType } from "common/game/activities/ActivityType";

const ActivityDetailSchema = z.object({
  hrid: z.nativeEnum(ActivityHrid),
  name: z.string(),
  type: z.nativeEnum(ActivityType),

  actions: z.array(
    z.object({
      hrid: z.nativeEnum(ActionHrid),
      weight: z.number().min(0),
    })
  ),

  theme: z.nativeEnum(ActivityTheme),
});

export type ActivityDetail = z.infer<typeof ActivityDetailSchema>;
