import { SkillHridSchema } from "common/game/skills/SkillHrid";
import { z } from "zod";

export const SkillDetailSchema = z
  .object({
    hrid: SkillHridSchema,
    name: z.string(),
    icon: z.string(),
    sortIndex: z.number().min(0).int(),
  })
  .strict();

export type SkillDetail = z.infer<typeof SkillDetailSchema>;
export type SkillDetailInput = z.input<typeof SkillDetailSchema>;
