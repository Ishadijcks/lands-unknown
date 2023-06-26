import { z } from "zod";
import { ItemAmountSchema } from "common/game/items/ItemAmount";
import { ExperienceGainSchema } from "common/game/skills/ExperienceGain";
import { ActionHridSchema } from "common/game/actions/ActionHrid";

export const ActionDetailSchema = z
  .object({
    hrid: ActionHridSchema,
    name: z.string(),
    icon: z.string(),
    baseDuration: z.number().min(0.1),

    inputItems: ItemAmountSchema.array().default([]),
    outputItems: ItemAmountSchema.array().default([]),

    experienceRewards: z.array(ExperienceGainSchema),
  })
  .strict();

export type ActionDetail = z.infer<typeof ActionDetailSchema>;
export type ActionDetailInput = z.input<typeof ActionDetailSchema>;
