import { SocketServer } from "backend/connection/SocketServer";
import { Game } from "common/Game";
import { gameData } from "common/content/GameData";
import process from "process";

const game = new Game(gameData);
const server = new SocketServer(game, process.env.PORT ?? 8999);

process.on("SIGINT", async function () {
  console.log("Shutting down...");
  await server.logOutAllPlayers();
  process.exit();
});
