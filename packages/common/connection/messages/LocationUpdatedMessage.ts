import type { BaseMessage } from "common/connection/messages/BaseMessage";
import type { MessageType } from "common/connection/messages/MessageType";
import { LocationHrid } from "common/game/worldmap/LocationHrid";

/**
 * Contains the new location,
 */
export interface LocationUpdatedMessage extends BaseMessage {
  type: MessageType.LocationUpdated;
  location: LocationHrid;
}
