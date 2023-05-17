import type { MessageType } from "common/connection/messages/MessageType";

export interface BaseMessage {
  type: MessageType;
}
