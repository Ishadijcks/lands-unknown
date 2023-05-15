import { BaseMessage } from "common/connection/messages/BaseMessage";
import { MessageType } from "common/connection/messages/MessageType";
import { CharacterSkill } from "common/game/skills/CharacterSkill";

/**
 * Contains the new experience and level for the updated skills
 */
export interface SkillsUpdatedMessage extends BaseMessage {
  type: MessageType.SkillsUpdated;
  skills: CharacterSkill[];
}
