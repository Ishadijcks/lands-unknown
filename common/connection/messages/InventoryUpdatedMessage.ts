import type { BaseMessage } from "common/connection/messages/BaseMessage";
import type { MessageType } from "common/connection/messages/MessageType";
import type { CharacterItem } from "common/game/items/CharacterItem";

/**
 * TODO(@Isha): Only send diffs
 * Contains the entire inventory.
 */
export interface InventoryUpdatedMessage extends BaseMessage {
  type: MessageType.InventoryUpdated;
  items: CharacterItem[];
}
