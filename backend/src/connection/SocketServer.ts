import express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import type { AddressInfo } from "ws";
import { PlayerSocket } from "backend/src/connection/PlayerSocket";
import { Player } from "backend/src/connection/Player";
import { RequestType } from "common/connection/requests/RequestType";
import { RequestParser } from "backend/src/connection/RequestParser";
import { ExampleRequestParser } from "backend/src/connection/requests/ExampleRequestParser";
import { BaseRequest } from "common/connection/requests/BaseRequest";

export class SocketServer {
  private _requestParsers: Record<RequestType, RequestParser> = {
    [RequestType.Example]: new ExampleRequestParser(),
  };

  constructor(port: number | string) {
    const app = express();

    // initialize a simple http server
    const server = http.createServer(app);

    // initialize the WebSocket server instance
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws: PlayerSocket) => {
      // TODO(@Isha): Get user from database
      ws.player = new Player("Isha");

      ws.onmessage = (ev) => {
        // TODO(@Isha): Add message parsers here
        const request = JSON.parse(ev.data) as BaseRequest;
        this.handleIncomingRequest(request, ws.player);
      };
    });

    // start our server
    server.listen(port, () => {
      console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
    });
  }

  public handleIncomingRequest(request: BaseRequest, player: Player): void {
    // Find the parser which can handle this request
    const parser = this._requestParsers[request.type];
    if (!parser) {
      console.warn(`[${player.name}] Unrecognized messageType`, request);
      return;
    }

    // Parse according to the schema
    const result = parser.schema.safeParse(request);
    if (!result.success) {
      const error = (result as any).error;
      console.warn(`[${player.name}] Invalid request`, error.issues, request);
      return;
    }

    // Perform the request
    const data = (result as any).data;
    parser.apply(data, player);
    console.debug(`[${player.name}] Request`, JSON.stringify(data));
  }
}
