import { RequestType } from "common/connection/requests/RequestType";
import { Player } from "backend/src/connection/Player";
import { BaseRequest } from "common/connection/requests/BaseRequest";
import { ZodSchema } from "zod";

export abstract class RequestParser {
  abstract type: RequestType;

  abstract schema: ZodSchema;

  /**
   * Update the state of our game with the content of this message
   */
  abstract apply(request: BaseRequest, player: Player): void;
}
