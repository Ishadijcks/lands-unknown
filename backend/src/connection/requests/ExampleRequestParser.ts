import { RequestParser } from "backend/src/connection/RequestParser";
import { RequestType } from "common/connection/requests/RequestType";
import { ExampleRequest, ExampleRequestSchema } from "common/connection/requests/ExampleRequest";
import { Player } from "backend/src/connection/Player";

export class ExampleRequestParser extends RequestParser {
  type = RequestType.Example;

  schema = ExampleRequestSchema;

  apply(request: ExampleRequest, player: Player): void {
    player.money += 1;
  }
}
