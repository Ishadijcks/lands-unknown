import { Character } from "backend/character/Character";
import { CharacterSaveData } from "backend/character/CharacterSaveData";
import { SignUpInfo } from "backend/persistance/SignUp";
import { LogInInfo } from "backend/persistance/LogIn";

export interface DatabaseClient {
  init(): void;
  loadCharacterData(id: string): Promise<CharacterSaveData | null>;
  createCharacter(info: SignUpInfo): Promise<string>;
  loginCharacter(info: LogInInfo): Promise<string | null>;
  storeCharacter(character: Character): void;
  isUserNameTaken(userName: string): Promise<boolean>;
  isEmailTaken(email: string): Promise<boolean>;
}
