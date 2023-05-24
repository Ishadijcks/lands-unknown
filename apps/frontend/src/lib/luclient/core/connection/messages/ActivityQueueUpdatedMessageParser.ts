import { MessageParser } from "$lib/luclient/core/connection/MessageParser";
import { MessageType } from "common/connection/messages/MessageType";
import type { LuClient } from "$lib/luclient/LuClient";
import type { ActivityQueueUpdatedMessage } from "common/connection/messages/ActivityQueueUpdatedMessage";

export class ActivityQueueUpdatedMessageParser extends MessageParser {
  type = MessageType.ActivityQueueUpdated;

  apply(message: ActivityQueueUpdatedMessage, client: LuClient): void {
    client.activityQueue.updateQueue(message.queue, message.currentAction, message.currentActivity);
  }
}
