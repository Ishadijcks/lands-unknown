import { skillDetailMap } from "common/content/skills/SkillDetailMap";
import { skillExpLevels } from "common/content/skills/SkillExpLevels";
import { activityDetailMap } from "common/content/activities/ActivityDetailMap";
import { actionDetailMap } from "common/content/actions/ActionDetailMap";
import { itemDetailMap } from "common/content/items/ItemDetailMap";

export const gameData = {
  activityDetailMap: activityDetailMap,
  actionDetailMap: actionDetailMap,
  itemDetailMap: itemDetailMap,
  skillDetailMap: skillDetailMap,
  skillExpLevels: skillExpLevels,
};

export type GameData = typeof gameData;
