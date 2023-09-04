import { RequestParser } from "backend/connection/RequestParser";
import { RequestType } from "common/connection/requests/RequestType";
import { Character } from "backend/character/Character";
import { Game } from "common/Game";
import { ScheduleTravelRequest, ScheduleTravelRequestSchema } from "common/connection/requests/ScheduleTravelRequest";

export class ScheduleTravelRequestParser extends RequestParser {
  type = RequestType.ScheduleTravel;

  schema = ScheduleTravelRequestSchema;

  apply(request: ScheduleTravelRequest, game: Game, character: Character) {
    // TODO(@Isha): Validate the requested path
    character.activityQueue.scheduleTravel(request.roads);
  }
}
