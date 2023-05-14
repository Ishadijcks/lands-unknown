import { RequestType } from "common/connection/requests/RequestType";
import { Player } from "backend/src/connection/Player";
import { BaseRequest } from "common/connection/requests/BaseRequest";
import { ZodSchema } from "zod";

export abstract class RequestParser {
  abstract type: RequestType;

  abstract schema: ZodSchema;

  /**
   * Perform the request
   */
  abstract apply(request: BaseRequest, player: Player): void;
}
