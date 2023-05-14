import { Player } from "backend/src/connection/Player";

export interface PlayerSocket extends WebSocket {
  player: Player;
}
