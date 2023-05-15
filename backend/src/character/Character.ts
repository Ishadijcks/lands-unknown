import { CharacterSkills } from "backend/src/character/CharacterSkills";
import { CharacterFeatures } from "backend/src/character/CharacterFeatures";
import { Game } from "common/Game";
import { CharacterFeature } from "backend/src/character/CharacterFeature";
import { MessageType } from "common/connection/messages/MessageType";
import { BaseMessage } from "common/connection/messages/BaseMessage";
import { SkillsUpdatedMessage } from "common/connection/messages/SkillsUpdatedMessage";
import { CharacterSkill } from "common/player/skills/CharacterSkill";

export class Character {
  id: string = "user/0";
  name: string;
  socket: WebSocket;

  skills: CharacterSkills = new CharacterSkills();

  private readonly _features: CharacterFeatures;
  private readonly _game: Game;

  constructor(name: string, game: Game) {
    this.name = name;
    this._game = game;

    this._features = {
      skills: this.skills,
    };
  }

  /**
   * Inject the current character and game data into all characterFeatures
   */
  public inject(): void {
    this.featureList.forEach((feature) => {
      feature.inject(this, this._game);
    });
  }

  public save(): Record<string, any> {
    const data: Record<string, any> = {};
    this.featureList.forEach((feature) => {
      data[feature.saveKey] = feature.save();
    });
    return data;
  }

  public load(data: Record<string, any>): void {
    this.featureList.forEach((feature) => {
      feature.load(data[feature.saveKey]);
    });
  }

  private get featureList(): CharacterFeature[] {
    return Object.values(this._features);
  }

  // Send update messages to the client
  public sendSkillsUpdated(skills: CharacterSkill[]): void {
    const message: SkillsUpdatedMessage = {
      type: MessageType.SkillsUpdated,
      skills: skills,
    };
    this._send(message);
  }

  private _send(data: BaseMessage) {
    this.socket.send(JSON.stringify(data));
  }
}
