import { skillDetailMap } from "common/content/SkillDetailMap";
import { skillExpLevels } from "common/content/SkillExpLevels";
import { activityDetailMap } from "common/content/ActivityDetailMap";
import { actionDetailMap } from "common/content/ActionDetailMap";
import { itemDetailMap } from "common/content/ItemDetailMap";
import { roadDetailMap } from "common/content/RoadDetailMap";
import { npcDetailMap } from "common/content/NpcDetailMap";
import { facilityTypeDetailMap } from "common/content/FacilityTypeDetailMap";
import { facilityDetailMap } from "common/content/FacilityDetailMap";
import { locationDetailMap } from "common/content/LocationDetailMap";

export const gameData = {
  activityDetailMap: activityDetailMap,
  actionDetailMap: actionDetailMap,
  itemDetailMap: itemDetailMap,
  skillDetailMap: skillDetailMap,
  skillExpLevels: skillExpLevels,

  npcDetailMap: npcDetailMap,
  roadDetailMap: roadDetailMap,
  facilityTypeDetailMap: facilityTypeDetailMap,
  facilityDetailMap: facilityDetailMap,
  locationDetailMap: locationDetailMap,
};

export type GameData = typeof gameData;
