import { z } from "zod";
import { ItemAmountSchema } from "common/game/items/ItemAmount";
import { ExperienceGainSchema } from "common/game/skills/ExperienceGain";
import { ActionHrid } from "common/game/actions/ActionHrid";

const ActionDetailSchema = z.object({
  hrid: z.nativeEnum(ActionHrid),
  name: z.string(),
  baseDuration: z.number().min(0.1),

  inputItems: z.array(ItemAmountSchema).optional(),
  outputItems: z.array(ItemAmountSchema).optional(),

  experienceRewards: z.array(ExperienceGainSchema),
});

export type ActionDetail = z.infer<typeof ActionDetailSchema>;
