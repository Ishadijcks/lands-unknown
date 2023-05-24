import { writable } from "svelte/store";

export enum GameState {
  CONNECTING,
  PLAYING,
  DISCONNECTED,
}

export const gameStateStore = writable(GameState.CONNECTING);
