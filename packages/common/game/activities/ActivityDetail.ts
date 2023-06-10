import { z } from "zod";
import { ActivityHridSchema } from "common/content/ActivityHrid";
import { ActionHridSchema } from "common/content/ActionHrid";
import { ActivityTheme } from "common/game/activities/ActivityTheme";
import { ActivityType } from "common/game/activities/ActivityType";

const BaseActivityDetailSchema = z.object({
  hrid: ActivityHridSchema,
  name: z.string(),
  type: z.nativeEnum(ActivityType),
  theme: z.nativeEnum(ActivityTheme),
});

const TravelActivityDetailSchema = BaseActivityDetailSchema.extend({
  type: z.literal(ActivityType.Travel),
});

const LinearActivityDetailSchema = BaseActivityDetailSchema.extend({
  type: z.literal(ActivityType.Linear),
  actions: z.array(ActionHridSchema),
});

const RandomActivityDetailSchema = BaseActivityDetailSchema.extend({
  type: z.literal(ActivityType.Randomized),

  actions: z.array(
    z.object({
      hrid: ActionHridSchema,
      weight: z.number().min(0),
    })
  ),
});

export const ActivityDetailSchema = z.discriminatedUnion("type", [
  TravelActivityDetailSchema,
  LinearActivityDetailSchema,
  RandomActivityDetailSchema,
]);

export type ActivityDetail = z.infer<typeof ActivityDetailSchema>;
export type ActivityDetailInput = z.input<typeof ActivityDetailSchema>;
export type TravelActivityDetail = z.infer<typeof TravelActivityDetailSchema>;
export type LinearActivityDetail = z.infer<typeof LinearActivityDetailSchema>;
export type RandomActivityDetail = z.infer<typeof RandomActivityDetailSchema>;
