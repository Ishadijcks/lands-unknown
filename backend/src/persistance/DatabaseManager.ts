import { DatabaseClient } from "backend/persistance/DatabaseClient";
import { Character } from "backend/character/Character";
import { Game } from "common/Game";
import { SignUpInfo } from "backend/persistance/SignUp";
import { LogInInfo } from "backend/persistance/LogIn";

/**
 * Responsible for saving and loading character data
 */
export class DatabaseManager {
  private _game: Game;
  client: DatabaseClient;

  constructor(client: DatabaseClient, game: Game) {
    this._game = game;
    this.client = client;
    this.client.init();
  }

  public async isUserNameTaken(userName: string): Promise<boolean> {
    return this.client.isUserNameTaken(userName);
  }

  public async isEmailTaken(email: string): Promise<boolean> {
    return this.client.isEmailTaken(email);
  }

  public async loadCharacter(userId: string): Promise<Character | null> {
    const data = await this.client.loadCharacterData(userId);
    if (!data) {
      return null;
    }
    const character = new Character(userId, data.userName, data.email, this._game);
    character.load(data);

    return character;
  }

  public async loginCharacter(info: LogInInfo): Promise<Character | null> {
    const userId = await this.client.loginCharacter(info);
    if (!userId) {
      return null;
    }
    return this.loadCharacter(userId);
  }

  public async createCharacter(info: SignUpInfo): Promise<Character> {
    const userId = await this.client.createCharacter(info);
    return new Character(userId, info.userName, info.email, this._game);
  }

  saveCharacter(character: Character): void {
    this.client.storeCharacter(character);
  }
}
