import { CharacterSkills } from "backend/src/character/CharacterSkills";
import { CharacterFeatures } from "backend/src/character/CharacterFeatures";
import { Game } from "common/Game";
import { CharacterFeature } from "backend/src/character/CharacterFeature";
import { MessageType } from "common/connection/messages/MessageType";
import { BaseMessage } from "common/connection/messages/BaseMessage";
import { SkillsUpdatedMessage } from "common/connection/messages/SkillsUpdatedMessage";
import { CharacterSkill } from "common/game/skills/CharacterSkill";
import { ActivityQueueUpdatedMessage } from "common/connection/messages/ActivityQueueUpdatedMessage";
import { CharacterActivityQueue } from "backend/src/character/activities/CharacterActivityQueue";
import { Action } from "common/game/actions/Action";
import { Activity } from "common/game/activities/Activity";
import { ScheduledActivity } from "common/game/activities/ScheduledActivity";

export class Character {
  id: string = "user/0";
  name: string;
  socket: WebSocket;

  skills: CharacterSkills = new CharacterSkills();
  activityQueue: CharacterActivityQueue = new CharacterActivityQueue();

  private readonly _features: CharacterFeatures;
  private readonly _game: Game;

  constructor(name: string, game: Game) {
    this.name = name;
    this._game = game;

    this._features = {
      skills: this.skills,
      activityQueue: this.activityQueue,
    };
  }

  public update(delta: number): void {
    this.activityQueue.update(delta);
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
  public sendActivityQueueUpdated(queue: ScheduledActivity[], currentAction: Action, currentActivity: Activity) {
    const message: ActivityQueueUpdatedMessage = {
      type: MessageType.ActivityQueueUpdated,
      queue,
      currentAction: currentAction
        ? {
            description: currentAction.detail.name,
            progress: currentAction.currentProgress,
            duration: currentAction.detail.baseDuration,
          }
        : null,
      currentActivity: currentActivity
        ? {
            description: currentActivity.detail.name,
            repetitions: currentActivity.repetitions,
          }
        : null,
    };
    this._send(message);
  }

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
