import { MessageParser } from "$lib/luclient/core/connection/MessageParser";
import { MessageType } from "common/connection/messages/MessageType";
import type { LuClient } from "$lib/luclient/LuClient";
import type { UpdateMoneyMessage } from "common/connection/messages/UpdateMoneyMessage";

export class UpdateMoneyMessageParser extends MessageParser {
  type = MessageType.UpdateMoney;

  apply(message: UpdateMoneyMessage, client: LuClient): void {
    client.money = message.amount;
  }
}
