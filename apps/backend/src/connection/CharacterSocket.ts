import { Character } from "backend/character/Character";
import { WebSocket } from "ws";

export interface CharacterSocket extends WebSocket {
  character: Character;
}
