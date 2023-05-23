import { DatabaseClient } from "backend/persistance/DatabaseClient";
import { Character } from "backend/character/Character";
import { Game } from "common/Game";

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

  createCharacter(userId: string, userName: string, email: string): Character {
    const newCharacter = new Character(userId, userName, email, this._game);
    this.saveCharacter(newCharacter);
    return newCharacter;
  }

  saveCharacter(character: Character): void {
    this.client.storeCharacter(character);
  }
}
