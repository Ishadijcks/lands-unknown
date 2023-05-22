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

  public async loadCharacter(userId: string): Promise<Character | null> {
    const data = await this.client.loadCharacterData(userId);
    if (!data) {
      return null;
    }
    const character = new Character(userId, data.userName, this._game);
    character.load(data);

    return character;
  }

  createCharacter(userId: string, userName: string): Character {
    return new Character(userId, userName, this._game);
  }

  saveCharacter(character: Character): void {
    this.client.storeCharacter(character);
  }

  async findOrCreateCharacter(userName: string, userId: string): Promise<Character> {
    const character = await this.loadCharacter(userId);
    return character ?? this.createCharacter(userName, userId);
  }
}
