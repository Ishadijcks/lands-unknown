import { ZodSchema } from "zod";
import { RequestType } from "common/connection/requests/RequestType";
import { BaseRequest } from "common/connection/requests/BaseRequest";
import { Character } from "backend/src/character/Character";

export abstract class RequestParser {
  abstract type: RequestType;

  abstract schema: ZodSchema;

  /**
   * Perform the request
   */
  abstract apply(request: BaseRequest, character: Character): void;
}
