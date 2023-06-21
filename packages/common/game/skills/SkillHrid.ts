// This file is generated from create-enums.ts, please do not edit it directly
import { z } from "zod";
import { skillHrids } from "common/content/generated/hrids";

export const SkillHridSchema = z.enum(skillHrids);
export type SkillHrid = z.infer<typeof SkillHridSchema>;
