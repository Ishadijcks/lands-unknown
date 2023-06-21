import { z } from "zod";
import { ItemAmountSchema } from "common/game/items/ItemAmount";
import { ExperienceGainSchema } from "common/game/skills/ExperienceGain";
import { ActionHridSchema } from "common/game/actions/ActionHrid";

export const ActionDetailSchema = z.object({
  hrid: ActionHridSchema,
  name: z.string(),
  baseDuration: z.number().min(0.1),

  inputItems: ItemAmountSchema.array().optional(),
  outputItems: ItemAmountSchema.array().optional(),

  experienceRewards: z.array(ExperienceGainSchema),
});

export type ActionDetail = z.infer<typeof ActionDetailSchema>;
export type ActionDetailInput = z.input<typeof ActionDetailSchema>;
