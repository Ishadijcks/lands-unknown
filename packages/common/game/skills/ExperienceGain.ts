import { z } from "zod";
import { SkillHridSchema } from "common/game/skills/SkillHrid";

export const ExperienceGainSchema = z.object({
  skillHrid: SkillHridSchema,
  value: z.number().min(0),
});

export type ExperienceGain = z.infer<typeof ExperienceGainSchema>;
