import { SimpleEventDispatcher } from "strongly-typed-events";
import type { BaseMessage } from "common/connection/messages/BaseMessage";
import type { ScheduleActivityRequest } from "common/connection/requests/ScheduleActivityRequest";

export class SocketClient {
  private _socket;

  private _onMessage = new SimpleEventDispatcher<BaseMessage>();

  public get onMessage() {
    return this._onMessage.asEvent();
  }

  constructor() {
    this._socket = new WebSocket("ws://localhost:8999");

    this._socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      this._onMessage.dispatch(data);
    };
  }

  public sendScheduleActivityRequest(request: ScheduleActivityRequest) {
    const data = JSON.stringify(request);
    this._socket.send(data);
  }
}
