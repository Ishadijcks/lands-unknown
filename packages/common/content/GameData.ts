import items from "common/content/generated/items.json";
import actions from "common/content/generated/actions.json";
import activities from "common/content/generated/activities.json";
import locations from "common/content/generated/locations.json";
import skills from "common/content/generated/skills.json";
import roads from "common/content/generated/roads.json";

import { skillExpLevels } from "common/content/SkillExpLevels";
import { ItemHrid } from "common/game/items/ItemHrid";
import { ItemDetail } from "common/game/items/ItemDetail";
import { SkillHrid } from "common/game/skills/SkillHrid";
import { SkillDetail } from "common/game/skills/SkillDetail";
import { ActionHrid } from "common/game/actions/ActionHrid";
import { ActionDetail } from "common/game/actions/ActionDetail";
import { ActivityHrid } from "common/game/activities/ActivityHrid";
import { ActivityDetail } from "common/game/activities/ActivityDetail";
import { LocationHrid } from "common/game/worldmap/LocationHrid";
import { LocationDetail } from "common/game/worldmap/LocationDetail";
import { RoadHrid } from "common/game/worldmap/RoadHrid";
import { RoadDetail } from "common/game/worldmap/RoadDetail";

export const gameData = {
  activityDetailMap: activities as Record<ActivityHrid, ActivityDetail>,
  actionDetailMap: actions as Record<ActionHrid, ActionDetail>,
  itemDetailMap: items as Record<ItemHrid, ItemDetail>,
  skillDetailMap: skills as Record<SkillHrid, SkillDetail>,
  skillExpLevels: skillExpLevels,

  npcDetailMap: {},
  roadDetailMap: roads as Record<RoadHrid, RoadDetail>,
  facilityTypeDetailMap: {},
  facilityDetailMap: {},
  locationDetailMap: locations as Record<LocationHrid, LocationDetail>,
};

export type GameData = typeof gameData;
