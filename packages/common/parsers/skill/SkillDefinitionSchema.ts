import { z } from "zod";
import { SkillDetailSchema } from "common/game/skills/SkillDetail";
import { ItemDetailSchema } from "common/game/items/ItemDetail";
import { ActionDetailSchema } from "common/game/actions/ActionDetail";
import { ActivityDetailSchema } from "common/game/activities/ActivityDetail";
import { BaseContentParser } from "common/parsers/BaseContentParser";
import { GameContent } from "common/parsers/GameContent";

export const SkillDefinitionSchema = z
  .object({
    skills: z.array(SkillDetailSchema).optional(),
    items: z.array(ItemDetailSchema).optional(),
    actions: z.array(ActionDetailSchema).optional(),
    activities: z.array(ActivityDetailSchema).optional(),
  })
  .strict();

export type SkillDefinition = z.infer<typeof SkillDefinitionSchema>;

export class SkillDefinitionParser extends BaseContentParser {
  schema = SkillDefinitionSchema;
  schemaName = "skill";

  apply(data: SkillDefinition): GameContent {
    return {
      skills: data.skills ?? [],
      items: data.items ?? [],
      actions: data.actions ?? [],
      activities: data.activities ?? [],
    };
  }
}
