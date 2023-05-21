import { MessageParser } from "$lib/luclient/core/connection/MessageParser";
import { MessageType } from "common/connection/messages/MessageType";
import type { LuClient } from "$lib/luclient/LuClient";
import type { InventoryUpdatedMessage } from "common/connection/messages/InventoryUpdatedMessage";

export class InventoryUpdatedMessageParser extends MessageParser {
  type = MessageType.InventoryUpdated;

  apply(message: InventoryUpdatedMessage, client: LuClient): void {
    client.inventory.updateCharacterItems(message.items);
  }
}
