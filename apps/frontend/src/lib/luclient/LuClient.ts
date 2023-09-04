import type { SocketClient } from "$lib/luclient/core/connection/SocketClient";
import type { MessageParser } from "$lib/luclient/core/connection/MessageParser";
import { SkillsUpdatedMessageParser } from "$lib/luclient/core/connection/messages/SkillsUpdatedMessageParser";
import type { BaseMessage } from "common/connection/messages/BaseMessage";
import { MessageType } from "common/connection/messages/MessageType";
import { ClientSkills } from "$lib/luclient/core/skills/ClientSkills";
import type { GameData } from "common/content/GameData";
import { ActivityQueueUpdatedMessageParser } from "$lib/luclient/core/connection/messages/ActivityQueueUpdatedMessageParser";
import { ClientActivityQueue } from "$lib/luclient/core/activities/ClientActivityQueue";
import { InventoryUpdatedMessageParser } from "$lib/luclient/core/connection/messages/InventoryUpdatedMessageParser";
import { ClientInventory } from "$lib/luclient/core/inventory/ClientInventory";
import { InitCharacterMessageParser } from "$lib/luclient/core/connection/messages/InitCharacterMessageParser";
import { IgnoreParser } from "$lib/luclient/core/connection/messages/IgnoreParser";
import { ClientWorldMap } from "$lib/luclient/core/worldmap/ClientWorldMap";
import { LocationUpdatedMessageParser } from "$lib/luclient/core/connection/messages/LocationsUpdatedMessageParser";

export class LuClient {
  socket: SocketClient;

  messageParsers: Record<MessageType, MessageParser> = {
    [MessageType.InitCharacter]: new InitCharacterMessageParser(),
    [MessageType.SkillsUpdated]: new SkillsUpdatedMessageParser(),
    [MessageType.LocationUpdated]: new LocationUpdatedMessageParser(),
    [MessageType.ActivityQueueUpdated]: new ActivityQueueUpdatedMessageParser(),
    [MessageType.InventoryUpdated]: new InventoryUpdatedMessageParser(),
    [MessageType.ConnectionClosed]: new IgnoreParser(),
  };

  userName = "";
  skills: ClientSkills;
  activityQueue: ClientActivityQueue;
  inventory: ClientInventory;
  worldMap: ClientWorldMap;

  constructor(gameData: GameData, socket: SocketClient) {
    this.skills = new ClientSkills(gameData.skillDetailMap, gameData.skillExpLevels);
    this.activityQueue = new ClientActivityQueue(gameData.actionDetailMap, gameData.activityDetailMap);
    this.inventory = new ClientInventory(gameData.itemDetailMap);
    this.worldMap = new ClientWorldMap(gameData.locationDetailMap, gameData.roadDetailMap);
    this.socket = socket;

    this.socket.onMessage.subscribe((message) => {
      this.parseMessage(message);
    });
  }

  private parseMessage(message: BaseMessage): void {
    console.log(message);
    const parser = this.messageParsers[message.type];

    if (!parser) {
      console.warn(`Unhandled message`, message);
      return;
    }
    parser.apply(message, this);
  }
}
