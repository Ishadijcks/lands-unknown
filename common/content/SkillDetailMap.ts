import { SkillHrid } from "common/player/skills/SkillHrid";
import { SkillDetail } from "common/player/skills/SkillDetail";

export const skillDetailMap: Record<SkillHrid, SkillDetail> = {
  [SkillHrid.Mining]: {
    name: "Mining",
    hrid: SkillHrid.Mining,
    sortIndex: 0,
  },
  [SkillHrid.Fishing]: {
    name: "Fishing",
    hrid: SkillHrid.Fishing,
    sortIndex: 0,
  },
  [SkillHrid.Woodcutting]: {
    name: "Woodcutting",
    hrid: SkillHrid.Woodcutting,
    sortIndex: 0,
  },
};
