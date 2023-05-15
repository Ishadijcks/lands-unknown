import { Game } from "common/Game";
import { Character } from "backend/src/character/Character";

/**
 * The base class for information that is stored on the character.
 * CharacterFeatures should modify the character and provide saving and loading
 */
export abstract class CharacterFeature {
  protected _game!: Game;
  protected _character!: Character;

  inject(character: Character, game: Game) {
    this._character = character;
    this._game = game;
  }

  public saveKey: string;

  protected constructor(key: string) {
    this.saveKey = key;
  }

  // Saving and loading
  public abstract save(): Record<string, any>;

  public abstract load(data: Record<string, any>): void;
}
