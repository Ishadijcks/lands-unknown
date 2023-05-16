import { z } from "zod";
import { ActivityHrid } from "common/game/activities/ActivityHrid";
import { ActionHrid } from "common/game/actions/ActionHrid";
import { ActivityType } from "common/game/activities/ActivityType";

const ActivityDetailSchema = z.object({
  hrid: z.nativeEnum(ActivityHrid),
  name: z.string(),
  // TODO(@Isha): Add different types of activities (linear, random)

  actions: z.array(
    z.object({
      hrid: z.nativeEnum(ActionHrid),
      weight: z.number().min(0),
    })
  ),

  type: z.nativeEnum(ActivityType),
});

export type ActivityDetail = z.infer<typeof ActivityDetailSchema>;
