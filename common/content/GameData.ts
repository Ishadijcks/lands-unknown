import { skillDetailMap } from "common/content/SkillDetailMap";
import { skillExpLevels } from "common/content/SkillExpLevels";

export const gameData = {
  skillDetailMap: skillDetailMap,
  skillExpLevels: skillExpLevels,
};

export type GameData = typeof gameData;
