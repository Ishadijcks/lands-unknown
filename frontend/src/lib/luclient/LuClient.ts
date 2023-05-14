import type { SocketClient } from "$lib/luclient/core/connection/SocketClient";
import type { MessageParser } from "$lib/luclient/core/connection/MessageParser";
import { UpdateMoneyMessageParser } from "$lib/luclient/core/connection/messages/UpdateMoneyMessageParser";
import type { BaseMessage } from "common/connection/messages/BaseMessage";
import { MessageType } from "common/connection/messages/MessageType";

export class LuClient {
  socket: SocketClient;

  messageParsers: Record<MessageType, MessageParser> = {
    [MessageType.UpdateMoney]: new UpdateMoneyMessageParser(),
  };
  money: number = 0;

  constructor(socket: SocketClient) {
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
