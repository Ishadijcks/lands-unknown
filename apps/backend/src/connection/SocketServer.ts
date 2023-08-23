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
import { Server, WebSocket } from "ws";
import { DatabaseManager } from "backend/persistance/DatabaseManager";
import { PrismaSupabaseClient } from "backend/persistance/PrismaSupabaseClient";
import { SignUpSchema } from "backend/persistance/SignUp";
import { LogInSchema } from "backend/persistance/LogIn";
import { CharacterManager } from "backend/persistance/CharacterManager";
import { ScheduleTravelRequestParser } from "backend/connection/requests/ScheduleTravelRequestParser";

export class SocketServer {
  private readonly TICK_DURATION = 1;

  private _game: Game;
  private _databaseManager: DatabaseManager;
  private _characterManager: CharacterManager;

  private _wss: Server;

  private _requestParsers: Record<RequestType, RequestParser> = {
    [RequestType.ScheduleActivity]: new ScheduleActivityRequestParser(),
    [RequestType.ScheduleTravel]: new ScheduleTravelRequestParser(),
  };

  constructor(game: Game, port: number | string) {
    this._game = game;
    this._databaseManager = new DatabaseManager(new PrismaSupabaseClient(), this._game);
    this._characterManager = new CharacterManager();
    const app = express();

    app.use(function (req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
      res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
      next();
    });
    app.use(express.json());

    app.post("/signup", async (req, res) => {
      const result = SignUpSchema.safeParse(req.body);
      if (!result.success) {
        res.send(JSON.stringify(result));
        return;
      }
      const data = result.data;
      const isUserNameTaken = await this._databaseManager.isUserNameTaken(data.userName);
      if (isUserNameTaken) {
        res.send(JSON.stringify({ success: false, error: { issues: [{ message: "Username is already taken" }] } }));
        return;
      }
      const isEmailTaken = await this._databaseManager.isEmailTaken(data.email);
      if (isEmailTaken) {
        res.send(JSON.stringify({ success: false, error: { issues: [{ message: "Email is already taken" }] } }));
        return;
      }

      const newChar = await this._databaseManager.createCharacter(data);
      this._databaseManager.saveCharacter(newChar);
      res.send(
        JSON.stringify({
          success: true,
          userName: newChar.userName,
          token: newChar.userId,
        })
      );
    });

    app.post("/login", async (req, res) => {
      const result = LogInSchema.safeParse(req.body);
      if (!result.success) {
        res.send(JSON.stringify(result));
        return;
      }
      const data = result.data;
      const character = await this._databaseManager.loginCharacter(data);

      if (!character) {
        res.send(JSON.stringify({ success: false, error: { issues: [{ message: "Invalid login information" }] } }));
        return;
      }

      res.send(
        JSON.stringify({
          success: true,
          userName: character.userName,
          token: character.userId,
        })
      );
    });
    // initialize a simple http server
    const server = http.createServer(app);

    // initialize the WebSocket server instance
    this._wss = new WebSocket.Server({ server });

    this._wss.on("connection", async (ws: CharacterSocket, request: http.IncomingMessage) => {
      // TODO(@Isha): Get user from database
      const token = request.url?.replace("/", "");
      if (!token) {
        ws.close();
        return;
      }
      const character = await this._databaseManager.loadCharacter(token);
      if (!character) {
        console.warn("Could not find user");
        return;
      }
      this._characterManager.addCharacter(character);
      ws.character = character;
      ws.character.socket = ws;

      ws.onmessage = (ev) => {
        const request = JSON.parse(ev.data.toString()) as BaseRequest;
        this.handleIncomingRequest(request, ws.character);
      };
      ws.character.sendInitCharacter();

      ws.on("error", console.error);

      ws.on("close", (ws: CharacterSocket) => {
        this._characterManager.removeCharacter(ws.character, "Logging out...");
        console.log(ws, "is logging out");
      });
    });

    // start our server
    server.listen(port, () => {
      console.log(server.address());
      console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
    });
    const interval = setInterval(() => {
      this.tick();
    }, this.TICK_DURATION * 1000);
  }

  private saveTicks = 0;

  private tick() {
    const start = Date.now();
    process.stdout.write("tick took: ");

    const characters = this._characterManager.onlineCharacters;
    characters.forEach((character) => {
      character.update(this.TICK_DURATION);
    });

    const end = Date.now();
    console.log(
      end - start,
      "ms for",
      characters.length,
      "Characters /",
      this._wss.clients.size,
      "Sockets |",
      characters.map((c) => c.userName).join(", ")
    );

    this.saveTicks++;
    if (this.saveTicks > 300) {
      characters.forEach((character) => {
        this._databaseManager.saveCharacter(character);
      });
      this.saveTicks = 0;
    }
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
    parser.apply(data, this._game, character);
    console.debug(`[${character.userName}] Request`, JSON.stringify(data));
  }

  public async logOutAllPlayers() {
    for await (const character of this._characterManager.onlineCharacters) {
      console.log("Logging out", character.userName);
      await this._databaseManager.saveCharacter(character);
      this._characterManager.removeCharacter(character, "Server is shutting down");
    }
  }
}
