import { RequestParser } from "backend/connection/RequestParser";
import { RequestType } from "common/connection/requests/RequestType";
import { Character } from "backend/character/Character";
import {
  ScheduleActivityRequest,
  ScheduleActivityRequestSchema,
} from "common/connection/requests/ScheduleActivityRequest";

export class ScheduleActivityRequestParser extends RequestParser {
  type = RequestType.ScheduleActivity;

  schema = ScheduleActivityRequestSchema;

  apply(request: ScheduleActivityRequest, character: Character) {
    character.activityQueue.scheduleActivity(request.activityHrid, request.repetitions);
  }
}
