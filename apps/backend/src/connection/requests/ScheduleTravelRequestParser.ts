import { RequestParser } from "backend/connection/RequestParser";
import { RequestType } from "common/connection/requests/RequestType";
import { Character } from "backend/character/Character";
import { Game } from "common/Game";
import { ScheduleTravelRequest, ScheduleTravelRequestSchema } from "common/connection/requests/ScheduleTravelRequest";
import { RoadHridSchema } from "common/game/worldmap/RoadHrid";

export class ScheduleTravelRequestParser extends RequestParser {
  type = RequestType.ScheduleTravel;

  schema = ScheduleTravelRequestSchema;

  apply(request: ScheduleTravelRequest, game: Game, character: Character) {
    character.activityQueue.scheduleTravel([
      RoadHridSchema.enum["/road/tutorial/house/to/tutorial/pigs"],
      RoadHridSchema.enum["/road/tutorial/pigs/to/tutorial/house"],
    ]);
  }
}
