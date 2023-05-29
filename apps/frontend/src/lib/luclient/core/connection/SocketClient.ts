import { SignalDispatcher, SimpleEventDispatcher } from "strongly-typed-events";
import type { BaseMessage } from "common/connection/messages/BaseMessage";
import type { ScheduleActivityRequest } from "common/connection/requests/ScheduleActivityRequest";
import type { ConnectionClosedMessage } from "common/connection/messages/ConnectionClosedMessage";
import { MessageType } from "common/connection/messages/MessageType";

import { PUBLIC_WEBSOCKET_URL } from "$env/static/public";
import { RequestType } from "common/connection/requests/RequestType";
import type { LocationHrid } from "common/game/worldmap/LocationHrid";
import type { BaseRequest } from "common/connection/requests/BaseRequest";

export class SocketClient {
  private _socket;

  private _onMessage = new SimpleEventDispatcher<BaseMessage>();
  private _onConnected = new SignalDispatcher();
  private _onError = new SimpleEventDispatcher<string>();
  private _onDisconnected = new SimpleEventDispatcher<ConnectionClosedMessage>();

  public get onMessage() {
    return this._onMessage.asEvent();
  }

  public get onConnect() {
    return this._onConnected.asEvent();
  }

  public get onError() {
    return this._onError.asEvent();
  }

  public get onDisconnect() {
    return this._onDisconnected.asEvent();
  }

  constructor(token: string) {
    this._socket = new WebSocket(`${PUBLIC_WEBSOCKET_URL}/${token}`);

    this._socket.onerror = () => {
      this._onError.dispatch(`Could not connect to server`);
    };

    this._socket.onclose = () => {
      this._onError.dispatch(`Server disconnect`);
    };

    this._socket.onmessage = (e) => {
      const data = JSON.parse(e.data) as BaseMessage;
      this._onMessage.dispatch(data);

      if (data.type === MessageType.ConnectionClosed) {
        this._onDisconnected.dispatch(data as ConnectionClosedMessage);
      }
      if (data.type === MessageType.InitCharacter) {
        this._onConnected.dispatch();
      }
    };
  }

  private _send(request: BaseRequest): void {
    const data = JSON.stringify(request);
    console.log("Sending", data);
    this._socket.send(data);
  }

  public sendScheduleActivityRequest(location: LocationHrid, index: number, repetitions: number) {
    const request: ScheduleActivityRequest = {
      type: RequestType.ScheduleActivity,
      repetitions,
      location,
      index,
    };
    this._send(request);
  }
}
