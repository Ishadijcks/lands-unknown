import type { SocketClient } from "$lib/luclient/core/connection/SocketClient";
import type { MessageParser } from "$lib/luclient/core/connection/MessageParser";
import { SkillsUpdatedMessageParser } from "$lib/luclient/core/connection/messages/SkillsUpdatedMessageParser";
import type { BaseMessage } from "common/connection/messages/BaseMessage";
import { MessageType } from "common/connection/messages/MessageType";
import { ClientSkills } from "$lib/luclient/core/skills/ClientSkills";
import type { GameData } from "common/content/GameData";

export class LuClient {
  socket: SocketClient;

  messageParsers: Record<MessageType, MessageParser> = {
    [MessageType.SkillsUpdated]: new SkillsUpdatedMessageParser(),
  };

  skills: ClientSkills;

  constructor(gameData: GameData, socket: SocketClient) {
    this.skills = new ClientSkills(gameData.skillDetailMap, gameData.skillExpLevels);

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
