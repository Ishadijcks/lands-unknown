import { z } from "zod";
import { BaseContentParser } from "common/parsers/BaseContentParser";
import { GameContent } from "common/parsers/GameContent";
import { LocationDetailSchema } from "common/game/worldmap/LocationDetail";

export const WorldMapDefinitionSchema = z
  .object({
    locations: z.array(LocationDetailSchema),
  })
  .strict();

export type WorldMapDefinition = z.infer<typeof WorldMapDefinitionSchema>;

export class WorldMapDefinitionParser extends BaseContentParser {
  schema = WorldMapDefinitionSchema;
  schemaName = "worldmap";

  apply(data: WorldMapDefinition): GameContent {
    return {
      locations: data.locations,
    };
  }
}
