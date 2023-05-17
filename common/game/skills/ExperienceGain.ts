import { z } from "zod";
import { SkillHrid } from "common/game/skills/SkillHrid";

export const ExperienceGainSchema = z.object({
  skillHrid: z.nativeEnum(SkillHrid),
  value: z.number().min(0),
});

export type ExperienceGain = z.infer<typeof ExperienceGainSchema>;
