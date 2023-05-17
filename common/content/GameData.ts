import { skillDetailMap } from "common/content/skills/SkillDetailMap";
import { skillExpLevels } from "common/content/skills/SkillExpLevels";
import { activityDetailMap } from "common/content/activities/ActivityDetailMap";
import { actionDetailMap } from "common/content/actions/ActionDetailMap";

export const gameData = {
  activityDetailMap: activityDetailMap,
  actionDetailMap: actionDetailMap,

  skillDetailMap: skillDetailMap,
  skillExpLevels: skillExpLevels,
};

export type GameData = typeof gameData;
