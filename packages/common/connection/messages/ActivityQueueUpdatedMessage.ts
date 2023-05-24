import type { BaseMessage } from "common/connection/messages/BaseMessage";
import type { MessageType } from "common/connection/messages/MessageType";
import type { CharacterAction } from "common/game/actions/CharacterAction";
import type { CharacterActivity } from "common/game/activities/CharacterActivity";
import type { ScheduledActivity } from "common/game/activities/ScheduledActivity";

/**
 * Contains the new state of the Activity Queue
 */
export interface ActivityQueueUpdatedMessage extends BaseMessage {
  type: MessageType.ActivityQueueUpdated;
  queue: ScheduledActivity[];
  currentAction: CharacterAction | null;
  currentActivity: CharacterActivity | null;
}
