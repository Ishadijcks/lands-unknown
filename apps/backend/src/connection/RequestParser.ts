import { ZodSchema } from "zod";
import { RequestType } from "common/connection/requests/RequestType";
import { BaseRequest } from "common/connection/requests/BaseRequest";
import { Character } from "backend/character/Character";
import { Game } from "common/Game";

export abstract class RequestParser {
  abstract type: RequestType;

  abstract schema: ZodSchema;

  /**
   * Perform the request
   */
  abstract apply(request: BaseRequest, game: Game, character: Character): void;
}
