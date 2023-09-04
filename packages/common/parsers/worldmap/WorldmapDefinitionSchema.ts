import { z } from "zod";
import { BaseContentParser } from "common/parsers/BaseContentParser";
import { GameContent } from "common/parsers/GameContent";
import { LocationDetailSchema } from "common/game/worldmap/LocationDetail";
import { RoadDetailSchema } from "common/game/worldmap/RoadDetail";
import { ActionDetailSchema } from "common/game/actions/ActionDetail";

export const WorldMapDefinitionSchema = z
  .object({
    locations: z.array(LocationDetailSchema).optional(),
    roads: z.array(RoadDetailSchema).optional(),
    actions: z.array(ActionDetailSchema).optional(),
  })
  .strict();

export type WorldMapDefinition = z.infer<typeof WorldMapDefinitionSchema>;

export class WorldMapDefinitionParser extends BaseContentParser {
  schema = WorldMapDefinitionSchema;
  schemaName = "worldmap";

  apply(data: WorldMapDefinition): GameContent {
    return {
      locations: data.locations,
      roads: data.roads,
      actions: data.actions,
    };
  }
}
