import { MessageParser } from "$lib/luclient/core/connection/MessageParser";
import { MessageType } from "common/connection/messages/MessageType";
import type { LuClient } from "$lib/luclient/LuClient";
import type { SkillsUpdatedMessage } from "common/connection/messages/SkillsUpdatedMessage";

export class SkillsUpdatedMessageParser extends MessageParser {
  type = MessageType.SkillsUpdated;

  apply(message: SkillsUpdatedMessage, client: LuClient): void {
    client.skills.updateCharacterSkills(message.skills);
  }
}
