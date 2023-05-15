import { Skills } from "common/game/skills/Skills";
import { GameData } from "common/content/GameData";

export class Game {
  skills: Skills;

  constructor(gameData: GameData) {
    this.skills = new Skills(gameData.skillDetailMap, gameData.skillExpLevels);
  }
}
