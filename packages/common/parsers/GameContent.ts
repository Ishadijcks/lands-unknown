import { ItemDetail } from "common/game/items/ItemDetail";
import { ActionDetail } from "common/game/actions/ActionDetail";
import { ActivityDetail } from "common/game/activities/ActivityDetail";
import { SkillDetail } from "common/game/skills/SkillDetail";

export interface GameContent {
  skills?: SkillDetail[];
  items?: ItemDetail[];
  actions?: ActionDetail[];
  activities?: ActivityDetail[];
}
