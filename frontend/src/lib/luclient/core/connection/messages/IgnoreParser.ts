import { MessageParser } from "$lib/luclient/core/connection/MessageParser";
import type { MessageType } from "common/connection/messages/MessageType";

export class IgnoreParser extends MessageParser {
  type: MessageType = "" as MessageType;

  apply(): void {
    // Do nothing
  }
}
