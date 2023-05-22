import express from "express";
import * as http from "http";
import type { AddressInfo } from "ws";
import { CharacterSocket } from "backend/connection/CharacterSocket";
import { RequestType } from "common/connection/requests/RequestType";
import { RequestParser } from "backend/connection/RequestParser";
import { BaseRequest } from "common/connection/requests/BaseRequest";
import { Character } from "backend/character/Character";
import { Game } from "common/Game";
import { ScheduleActivityRequestParser } from "backend/connection/requests/ScheduleActivityRequestParser";
import { WebSocket } from "ws";
import { DatabaseManager } from "backend/persistance/DatabaseManager";
import { PrismaSupabaseClient } from "backend/persistance/PrismaSupabaseClient";

export class SocketServer {
  private _game: Game;
  private _databaseManager: DatabaseManager;

  private _requestParsers: Record<RequestType, RequestParser> = {
    [RequestType.ScheduleActivity]: new ScheduleActivityRequestParser(),
  };

  constructor(game: Game, port: number | string) {
    this._game = game;
    this._databaseManager = new DatabaseManager(new PrismaSupabaseClient(), this._game);

    const app = express();

    // initialize a simple http server
    const server = http.createServer(app);

    // initialize the WebSocket server instance
    const wss = new WebSocket.Server({ server });

    wss.on("connection", async (ws: CharacterSocket) => {
      // TODO(@Isha): Get user from database
      const character = await this._databaseManager.findOrCreateCharacter("Isha", "user/0");
      if (!character) {
        console.warn("Could not find user");
        return;
      }
      ws.character = character;
      ws.character.socket = ws;

      ws.onmessage = (ev) => {
        const request = JSON.parse(ev.data.toString()) as BaseRequest;
        this.handleIncomingRequest(request, ws.character);
      };

      setInterval(() => {
        ws.character.update(0.1);
      }, 100);
      setInterval(() => {
        this._databaseManager.saveCharacter(ws.character);
      }, 10000);
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
      console.warn(`[${character.userName}] Unrecognized messageType`, request);
      return;
    }

    // Parse according to the schema
    const result = parser.schema.safeParse(request);
    if (!result.success) {
      const error = (result as any).error;
      console.warn(`[${character.userName}] Invalid request`, error.issues, request);
      return;
    }

    // Perform the request
    const data = (result as any).data;
    parser.apply(data, character);
    console.debug(`[${character.userName}] Request`, JSON.stringify(data));
  }
}
