import { Character } from "backend/src/character/Character";

export interface CharacterSocket extends WebSocket {
  character: Character;
}
