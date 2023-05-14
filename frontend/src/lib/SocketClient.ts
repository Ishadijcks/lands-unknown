import type { ExampleRequest } from "common/connection/requests/ExampleRequest";

export class SocketClient {
  private _socket;

  constructor() {
    this._socket = new WebSocket("ws://localhost:8999");

    this._socket.onmessage = (e) => {
      console.log(e.data);
    };
  }

  public sendExampleRequest(request: ExampleRequest) {
    const data = JSON.stringify(request);
    this._socket.send(data);
  }
}
