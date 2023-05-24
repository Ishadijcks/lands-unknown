import { MessageType } from "common/connection/messages/MessageType";
import { BaseMessage } from "common/connection/messages/BaseMessage";

export interface ConnectionClosedMessage extends BaseMessage {
  type: MessageType.ConnectionClosed;
  reason: string;
}
