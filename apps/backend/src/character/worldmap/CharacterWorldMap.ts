import { CharacterFeature } from "backend/character/CharacterFeature";
import { LocationHrid } from "common/game/worldmap/LocationHrid";

export class CharacterWorldMap extends CharacterFeature {
  private _characterLocation: LocationHrid;

  constructor() {
    super("world-map");
    this._characterLocation = LocationHrid.Town;
  }

  // TODO(@Isha): Implement
  load(data: any): void {}

  save(): any {}
}
