import type { SkillHrid } from "common/player/skills/SkillHrid";

export interface CharacterSkill {
  experience: number;
  level: number;
  skillHrid: SkillHrid;
}
