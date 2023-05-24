import { Skills } from "common/game/skills/Skills";
import { GameData } from "common/content/GameData";
import { ActivityQueue } from "common/game/activities/ActivityQueue";

export class Game {
  activityQueue: ActivityQueue;
  skills: Skills;

  constructor(gameData: GameData) {
    this.activityQueue = new ActivityQueue(gameData.actionDetailMap, gameData.activityDetailMap);
    this.skills = new Skills(gameData.skillDetailMap, gameData.skillExpLevels);
  }
}
