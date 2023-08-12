import { CharacterFeature } from "backend/character/CharacterFeature";
import { LocationHrid, LocationHridSchema } from "common/game/worldmap/LocationHrid";

export class CharacterWorldMap extends CharacterFeature {
  private _characterLocation: LocationHrid;

  constructor() {
    super("world-map");
    this._characterLocation = LocationHridSchema.enum["/tutorial/pigs"];
  }

  // TODO(@Isha): Implement
  load(data: any): void {}

  save(): any {}
}
