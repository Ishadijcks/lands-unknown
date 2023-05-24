import { CharacterSkills } from "backend/character/skills/CharacterSkills";
import { CharacterFeatures } from "backend/character/CharacterFeatures";
import { Game } from "common/Game";
import { CharacterFeature } from "backend/character/CharacterFeature";
import { MessageType } from "common/connection/messages/MessageType";
import { BaseMessage } from "common/connection/messages/BaseMessage";
import { SkillsUpdatedMessage } from "common/connection/messages/SkillsUpdatedMessage";
import { CharacterSkill } from "common/game/skills/CharacterSkill";
import { ActivityQueueUpdatedMessage } from "common/connection/messages/ActivityQueueUpdatedMessage";
import { CharacterActivityQueue } from "backend/character/activities/CharacterActivityQueue";
import { Action } from "common/game/actions/Action";
import { Activity } from "common/game/activities/Activity";
import { ScheduledActivity } from "common/game/activities/ScheduledActivity";
import { CharacterSocket } from "backend/connection/CharacterSocket";
import { CharacterItem } from "common/game/items/CharacterItem";
import { InventoryUpdatedMessage } from "common/connection/messages/InventoryUpdatedMessage";
import { CharacterInventory } from "backend/character/inventory/CharacterInventory";
import { CharacterSaveData } from "backend/character/CharacterSaveData";
import { InitCharacterMessage } from "common/connection/messages/InitCharacterMessage";

export class Character {
  userId: string;
  userName: string;
  email: string;
  socket!: CharacterSocket;

  skills: CharacterSkills = new CharacterSkills();
  activityQueue: CharacterActivityQueue = new CharacterActivityQueue();
  inventory: CharacterInventory = new CharacterInventory();

  private readonly _features: CharacterFeatures;
  private readonly _game: Game;

  constructor(userId: string, userName: string, email: string, game: Game) {
    this.userId = userId;
    this.userName = userName;
    this.email = email;
    this._game = game;

    this._features = {
      skills: this.skills,
      activityQueue: this.activityQueue,
      inventory: this.inventory,
    };

    this.inject();
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

  public save(): CharacterSaveData {
    return {
      userId: this.userId,
      userName: this.userName,
      email: this.email,
      skills: this.skills.save(),
      inventory: this.inventory.save(),
    };
  }

  public load(data: CharacterSaveData): void {
    this.userId = data.userId;
    this.skills.load(data.skills);
    this.inventory.load(data.inventory);
  }

  private get featureList(): CharacterFeature[] {
    return Object.values(this._features);
  }

  // Send update messages to the client
  public sendActivityQueueUpdated(
    queue: ScheduledActivity[],
    currentAction: Action | null,
    currentActivity: Activity | null
  ) {
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
            type: currentActivity.detail.type,
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

  public sendInventoryUpdated(items: CharacterItem[]): void {
    const message: InventoryUpdatedMessage = {
      type: MessageType.InventoryUpdated,
      items: items,
    };
    this._send(message);
  }

  public sendInitCharacter(): void {
    const message: InitCharacterMessage = {
      type: MessageType.InitCharacter,
      userName: this.userName,
      inventory: this.inventory.items,
      skills: this.skills.skills,
    };
    this._send(message);
  }
}
