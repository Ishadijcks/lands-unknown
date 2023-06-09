import type { BaseMessage } from "common/connection/messages/BaseMessage";
import type { MessageType } from "common/connection/messages/MessageType";
import type { CharacterSkill } from "common/game/skills/CharacterSkill";

/**
 * Contains the new experience and level for the updated skills
 */
export interface SkillsUpdatedMessage extends BaseMessage {
  type: MessageType.SkillsUpdated;
  skills: CharacterSkill[];
}
