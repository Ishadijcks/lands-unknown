import { z } from "zod";
import { skillHrids } from "common/content/generated/hrids";

export const SkillHridSchema = z.enum(skillHrids);
export type SkillHrid = z.infer<typeof SkillHridSchema>;
