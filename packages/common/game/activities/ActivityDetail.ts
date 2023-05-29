import { z } from "zod";
import { ActivityHrid } from "common/game/activities/ActivityHrid";
import { ActionHrid } from "common/game/actions/ActionHrid";
import { ActivityTheme } from "common/game/activities/ActivityTheme";
import { ActivityType } from "common/game/activities/ActivityType";

const BaseActivityDetailSchema = z.object({
  hrid: z.nativeEnum(ActivityHrid),
  name: z.string(),
  type: z.nativeEnum(ActivityType),
  theme: z.nativeEnum(ActivityTheme),
});

const TravelActivityDetailSchema = BaseActivityDetailSchema.extend({
  type: z.literal(ActivityType.Travel),
});

const LinearActivityDetailSchema = BaseActivityDetailSchema.extend({
  type: z.literal(ActivityType.Linear),
  actions: z.array(z.nativeEnum(ActionHrid)),
});

const RandomActivityDetailSchema = BaseActivityDetailSchema.extend({
  type: z.literal(ActivityType.Randomized),

  actions: z.array(
    z.object({
      hrid: z.nativeEnum(ActionHrid),
      weight: z.number().min(0),
    })
  ),
});

const ActivityDetailSchema = z.discriminatedUnion("type", [
  TravelActivityDetailSchema,
  LinearActivityDetailSchema,
  RandomActivityDetailSchema,
]);

export type ActivityDetail = z.infer<typeof ActivityDetailSchema>;
export type TravelActivityDetail = z.infer<typeof TravelActivityDetailSchema>;
export type LinearActivityDetail = z.infer<typeof LinearActivityDetailSchema>;
export type RandomActivityDetail = z.infer<typeof RandomActivityDetailSchema>;
