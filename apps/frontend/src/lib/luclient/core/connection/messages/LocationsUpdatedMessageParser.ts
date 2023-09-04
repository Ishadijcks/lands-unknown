import { MessageParser } from "$lib/luclient/core/connection/MessageParser";
import { MessageType } from "common/connection/messages/MessageType";
import type { LuClient } from "$lib/luclient/LuClient";
import type { LocationUpdatedMessage } from "common/connection/messages/LocationUpdatedMessage";

export class LocationUpdatedMessageParser extends MessageParser {
  type = MessageType.LocationUpdated;

  apply(message: LocationUpdatedMessage, client: LuClient): void {
    client.worldMap.updateCharacterLocation(message.location);
  }
}
