import { RequestParser } from "backend/connection/RequestParser";
import { RequestType } from "common/connection/requests/RequestType";
import { Character } from "backend/character/Character";
import {
  ScheduleActivityRequest,
  ScheduleActivityRequestSchema,
} from "common/connection/requests/ScheduleActivityRequest";
import { Game } from "common/Game";
import { ScheduleTravelRequest } from "common/connection/requests/ScheduleTravelRequest";

export class ScheduleTravelRequestParser extends RequestParser {
  type = RequestType.ScheduleTravel;

  schema = ScheduleActivityRequestSchema;

  apply(request: ScheduleTravelRequest, game: Game, character: Character) {
    character.activityQueue.scheduleTravel(request.location);
  }
}
