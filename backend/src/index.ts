import { SocketServer } from "backend/connection/SocketServer";
import { Game } from "common/Game";
import { gameData } from "common/content/GameData";

const game = new Game(gameData);
const server = new SocketServer(game, 8999);
