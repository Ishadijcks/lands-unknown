import express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import type { AddressInfo } from "ws";
import { UserSocket } from "./UserSocket";
import { User } from "./User";
import { ExampleRequestSchema } from "common/connection/requests/ExampleRequest";

export class SocketServer {
  constructor(port: number | string) {
    const app = express();

    // initialize a simple http server
    const server = http.createServer(app);

    // initialize the WebSocket server instance
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws: UserSocket) => {
      // TODO(@Isha): Get user from database
      ws.user = new User("Isha");

      ws.onmessage = (ev) => {
        // TODO(@Isha): Add message parsers here
        const json = JSON.parse(ev.data);
        const res = ExampleRequestSchema.safeParse(json);

        console.log(ev.data);
        console.log(res);
      };
      ws.send("Yeah");
    });

    // start our server
    server.listen(port, () => {
      console.log(
        `Server started on port ${(server.address() as AddressInfo).port} :)`
      );
    });
  }
}
