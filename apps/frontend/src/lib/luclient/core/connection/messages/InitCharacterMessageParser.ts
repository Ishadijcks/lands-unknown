import { MessageParser } from "$lib/luclient/core/connection/MessageParser";
import { MessageType } from "common/connection/messages/MessageType";
import type { LuClient } from "$lib/luclient/LuClient";
import type { InitCharacterMessage } from "common/connection/messages/InitCharacterMessage";

export class InitCharacterMessageParser extends MessageParser {
  type = MessageType.InitCharacter;

  apply(message: InitCharacterMessage, client: LuClient): void {
    client.userName = message.userName;
    client.skills.updateCharacterSkills(message.skills);
    client.inventory.updateCharacterItems(message.inventory);
  }
}
