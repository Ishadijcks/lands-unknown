import type { CharacterSkills } from "backend/character/skills/CharacterSkills";
import type { CharacterActivityQueue } from "backend/character/activities/CharacterActivityQueue";
import type { CharacterInventory } from "backend/character/inventory/CharacterInventory";
import { CharacterWorldMap } from "backend/character/worldmap/CharacterWorldMap";

export interface CharacterFeatures {
  skills: CharacterSkills;
  activityQueue: CharacterActivityQueue;
  inventory: CharacterInventory;
  worldMap: CharacterWorldMap;
}
