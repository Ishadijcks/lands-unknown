import { skillDetailMap } from "common/content/skills/SkillDetailMap";
import { skillExpLevels } from "common/content/skills/SkillExpLevels";
import { activityDetailMap } from "common/content/activities/ActivityDetailMap";
import { actionDetailMap } from "common/content/actions/ActionDetailMap";
import { itemDetailMap } from "common/content/items/ItemDetailMap";
import { roadDetailMap } from "common/content/worldmap/RoadDetailMap";
import { npcDetailMap } from "common/content/npcs/NpcDetailMap";
import { facilityTypeDetailMap } from "common/content/worldmap/FacilityTypeDetailMap";
import { facilityDetailMap } from "common/content/worldmap/FacilityDetailMap";
import { locationDetailMap } from "common/content/worldmap/LocationDetailMap";

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
