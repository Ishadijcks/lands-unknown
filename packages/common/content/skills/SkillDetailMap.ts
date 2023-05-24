import { SkillHrid } from "common/game/skills/SkillHrid";
import type { SkillDetail } from "common/game/skills/SkillDetail";

export const skillDetailMap: Record<SkillHrid, SkillDetail> = {
  [SkillHrid.Mining]: {
    name: "Mining",
    hrid: SkillHrid.Mining,
    icon: "mining",
    sortIndex: 0,
  },
  [SkillHrid.Fishing]: {
    name: "Fishing",
    hrid: SkillHrid.Fishing,
    icon: "fishing",
    sortIndex: 0,
  },
  [SkillHrid.Woodcutting]: {
    name: "Woodcutting",
    hrid: SkillHrid.Woodcutting,
    icon: "cauldron",
    sortIndex: 0,
  },
};
