import { RequestParser } from "backend/connection/RequestParser";
import { RequestType } from "common/connection/requests/RequestType";
import { Character } from "backend/character/Character";
import { Game } from "common/Game";
import { ScheduleTravelRequest, ScheduleTravelRequestSchema } from "common/connection/requests/ScheduleTravelRequest";
import { RoadHrid } from "common/game/worldmap/RoadHrid";

export class ScheduleTravelRequestParser extends RequestParser {
  type = RequestType.ScheduleTravel;

  schema = ScheduleTravelRequestSchema;

  apply(request: ScheduleTravelRequest, game: Game, character: Character) {
    console.log(request);
    character.activityQueue.scheduleTravel([RoadHrid.Road1, RoadHrid.Road2]);
    // character.activityQueue.scheduleActivity(activityId, request.repetitions);
  }
}
