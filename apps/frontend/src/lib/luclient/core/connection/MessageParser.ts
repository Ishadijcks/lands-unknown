import type { MessageType } from "common/connection/messages/MessageType";
import type { BaseMessage } from "common/connection/messages/BaseMessage";
import type { LuClient } from "$lib/luclient/LuClient";

export abstract class MessageParser {
  abstract type: MessageType;

  /**
   * Update the state of our client with the content of this message
   */
  abstract apply(message: BaseMessage, client: LuClient): void;
}
