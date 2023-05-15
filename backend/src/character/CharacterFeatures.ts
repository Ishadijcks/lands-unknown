import { CharacterSkills } from "backend/src/character/CharacterSkills";
import { CharacterActivityQueue } from "backend/src/character/CharacterActivityQueue";

export interface CharacterFeatures {
  skills: CharacterSkills;
  activityQueue: CharacterActivityQueue;
}
