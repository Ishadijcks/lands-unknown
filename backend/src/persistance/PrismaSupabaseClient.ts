import { Prisma, PrismaClient } from "@prisma/client";
import { DatabaseClient } from "backend/persistance/DatabaseClient";
import { CharacterSaveData } from "backend/character/CharacterSaveData";
import { Character } from "backend/character/Character";

export class PrismaSupabaseClient implements DatabaseClient {
  private _prisma = new PrismaClient();

  init(): void {}

  async loadCharacterData(id: string): Promise<CharacterSaveData | null> {
    const character = await this._prisma.character.findUnique({
      where: {
        userId: id,
      },
    });
    if (!character) {
      return null;
    }
    return character.data as unknown as CharacterSaveData;
  }

  async isUserNameTaken(userName: string): Promise<boolean> {
    const character = await this._prisma.character.findUnique({
      where: {
        userName: userName,
      },
    });
    return character != null;
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const character = await this._prisma.character.findUnique({
      where: {
        email: email,
      },
    });
    return character != null;
  }

  async storeCharacter(character: Character): Promise<void> {
    const save = character.save();
    const result = await this._prisma.character.upsert({
      where: {
        userId: character.userId,
      },
      create: {
        userId: character.userId,
        userName: character.userName,
        email: character.email,
        data: save as unknown as Prisma.JsonObject,
      },
      update: {
        data: save as unknown as Prisma.JsonObject,
      },
    });
  }
}
