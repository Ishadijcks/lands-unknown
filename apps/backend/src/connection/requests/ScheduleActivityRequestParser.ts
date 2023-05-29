import { RequestParser } from "backend/connection/RequestParser";
import { RequestType } from "common/connection/requests/RequestType";
import { Character } from "backend/character/Character";
import {
  ScheduleActivityRequest,
  ScheduleActivityRequestSchema,
} from "common/connection/requests/ScheduleActivityRequest";
import { Game } from "common/Game";

export class ScheduleActivityRequestParser extends RequestParser {
  type = RequestType.ScheduleActivity;

  schema = ScheduleActivityRequestSchema;

  apply(request: ScheduleActivityRequest, game: Game, character: Character) {
    const locationDetail = game.worldMap.locationDetailMap[request.location];
    const activityId = locationDetail?.activities[request.index];
    if (!activityId) {
      console.warn("Invalid request", request);
      return;
    }
    character.activityQueue.scheduleActivity(activityId, request.repetitions);
  }
}
