import { Character } from "backend/character/Character";
import { CharacterSaveData } from "backend/character/CharacterSaveData";

export interface DatabaseClient {
  init(): void;
  loadCharacterData(id: string): Promise<CharacterSaveData | null>;
  storeCharacter(character: Character): void;

  // getUserRecord(token: string): Promise<UserRecord>;
}
