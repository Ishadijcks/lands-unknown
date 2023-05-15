import { SkillHrid } from "common/player/skills/SkillHrid";
import { z } from "zod";

const SkillDetailSchema = z.object({
  hrid: z.nativeEnum(SkillHrid),
  name: z.string(),
  sortIndex: z.number().min(0).int(),
});

export type SkillDetail = z.infer<typeof SkillDetailSchema>;