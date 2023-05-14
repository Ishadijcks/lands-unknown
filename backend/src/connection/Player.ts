import { UpdateMoneyMessage } from "common/connection/messages/UpdateMoneyMessage";
import { MessageType } from "common/connection/messages/MessageType";
import { BaseMessage } from "common/connection/messages/BaseMessage";

export class Player {
  id: string = "user/0";
  name: string;
  socket: WebSocket;

  money: number = 0;

  constructor(name: string) {
    this.name = name;
  }

  public synchronizeMoney() {
    const message: UpdateMoneyMessage = {
      type: MessageType.UpdateMoney,
      amount: this.money,
    };
    this._synchronize(message);
  }

  private _synchronize(data: BaseMessage) {
    this.socket.send(JSON.stringify(data));
  }
}
