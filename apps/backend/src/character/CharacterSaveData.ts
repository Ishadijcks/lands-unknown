import { CharacterSkillsSaveData } from "backend/character/skills/CharacterSkillsSaveData";
import { CharacterInventorySaveData } from "backend/character/inventory/CharacterInventorySaveData";

export interface CharacterSaveData {
  userId: string;
  userName: string;
  email: string;
  skills: CharacterSkillsSaveData;
  inventory: CharacterInventorySaveData;
}
