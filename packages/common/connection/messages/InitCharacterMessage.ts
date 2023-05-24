import { CharacterItem } from "common/game/items/CharacterItem";
import { MessageType } from "common/connection/messages/MessageType";
import { BaseMessage } from "common/connection/messages/BaseMessage";
import { CharacterSkill } from "common/game/skills/CharacterSkill";

export interface InitCharacterMessage extends BaseMessage {
  type: MessageType.InitCharacter;
  userName: string;
  skills: CharacterSkill[];
  inventory: CharacterItem[];
}
