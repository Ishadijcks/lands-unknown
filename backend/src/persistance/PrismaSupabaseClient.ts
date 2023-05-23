import { Prisma, PrismaClient } from "@prisma/client";
import { DatabaseClient } from "backend/persistance/DatabaseClient";
import { CharacterSaveData } from "backend/character/CharacterSaveData";
import { Character } from "backend/character/Character";

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SignUpInfo } from "backend/persistance/SignUp";
import { LogInInfo } from "backend/persistance/LogIn";

export class PrismaSupabaseClient implements DatabaseClient {
  private _prisma = new PrismaClient();
  private _supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Could not instantiate supabase client");
    }
    this._supabase = createClient(supabaseUrl, supabaseKey);
  }

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

  async loginCharacter(info: LogInInfo): Promise<string | null> {
    const result = await this._supabase.auth.signInWithPassword(info);
    if (result.error) {
      return null;
    }
    if (result.data.user == null) {
      return null;
    }
    return result.data.user?.id;
  }

  async createCharacter(info: SignUpInfo): Promise<string> {
    const result = await this._supabase.auth.admin.createUser({
      email: info.email,
      password: info.password,
      email_confirm: true,
    });
    if (result.error) {
      console.error(result.error);
      throw new Error(result.error.message);
    }
    if (result.data.user == null) {
      console.error(result.data);
      throw new Error("User is null");
    }
    const userId = result.data.user?.id;

    await this._prisma.character.create({
      data: {
        userId: userId,
        userName: info.userName,
        email: info.email,
        data: "",
      },
    });

    return userId;
  }

  async storeCharacter(character: Character): Promise<void> {
    const save = character.save();
    const result = await this._prisma.character.update({
      where: {
        userId: character.userId,
      },
      data: {
        data: save as unknown as Prisma.JsonObject,
      },
    });
  }
}
