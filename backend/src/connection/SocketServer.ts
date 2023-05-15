import express from "express";
import * as http from "http";
import type { AddressInfo } from "ws";
import * as WebSocket from "ws";
import { CharacterSocket } from "backend/src/connection/CharacterSocket";
import { RequestType } from "common/connection/requests/RequestType";
import { RequestParser } from "backend/src/connection/RequestParser";
import { BaseRequest } from "common/connection/requests/BaseRequest";
import { Character } from "backend/src/character/Character";
import { Game } from "common/Game";
import { SkillHrid } from "common/player/skills/SkillHrid";

export class SocketServer {
  private _game: Game;
  private _requestParsers: Record<RequestType, RequestParser> = {};

  constructor(game: Game, port: number | string) {
    this._game = game;

    const app = express();

    // initialize a simple http server
    const server = http.createServer(app);

    // initialize the WebSocket server instance
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws: CharacterSocket) => {
      // TODO(@Isha): Get user from database
      const character = new Character("Isha", game);
      character.inject();
      ws.character = character;
      ws.character.socket = ws;

      setInterval(() => {
        ws.character.skills.gainExp(SkillHrid.Woodcutting, 10);
      }, 1000);

      ws.onmessage = (ev) => {
        const request = JSON.parse(ev.data) as BaseRequest;
        this.handleIncomingRequest(request, ws.character);
      };
    });

    // start our server
    server.listen(port, () => {
      console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
    });
  }

  public handleIncomingRequest(request: BaseRequest, character: Character): void {
    // Find the parser which can handle this request
    const parser = this._requestParsers[request.type];
    if (!parser) {
      console.warn(`[${character.name}] Unrecognized messageType`, request);
      return;
    }

    // Parse according to the schema
    const result = parser.schema.safeParse(request);
    if (!result.success) {
      const error = (result as any).error;
      console.warn(`[${character.name}] Invalid request`, error.issues, request);
      return;
    }

    // Perform the request
    const data = (result as any).data;
    parser.apply(data, character);
    console.debug(`[${character.name}] Request`, JSON.stringify(data));
  }
}
