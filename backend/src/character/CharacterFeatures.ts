import type { CharacterSkills } from "backend/character/CharacterSkills";
import type { CharacterActivityQueue } from "backend/character/activities/CharacterActivityQueue";
import type { CharacterInventory } from "backend/character/inventory/CharacterInventory";

export interface CharacterFeatures {
  skills: CharacterSkills;
  activityQueue: CharacterActivityQueue;
  inventory: CharacterInventory;
}
