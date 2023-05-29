import { Skills } from "common/game/skills/Skills";
import { GameData } from "common/content/GameData";
import { ActivityQueue } from "common/game/activities/ActivityQueue";
import { WorldMap } from "common/game/worldmap/WorldMap";

export class Game {
  activityQueue: ActivityQueue;
  skills: Skills;
  worldMap: WorldMap;

  constructor(gameData: GameData) {
    this.activityQueue = new ActivityQueue(gameData.actionDetailMap, gameData.activityDetailMap);
    this.skills = new Skills(gameData.skillDetailMap, gameData.skillExpLevels);
    this.worldMap = new WorldMap(gameData.locationDetailMap, gameData.roadDetailMap);
  }
}
