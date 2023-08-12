import { ContentFlattener } from "common/scripts/ContentFlattener";
import { SchemaGenerator } from "common/scripts/SchemaGenerator";
import { SkillDefinitionSchema } from "common/parsers/skill/SkillDefinitionSchema";
import { WorldMapDefinitionSchema } from "common/parsers/worldmap/WorldmapDefinitionSchema";
import { ContentType } from "common/parsers/ContentType";

// Such that we can validate all content with Zod
const flattener = new ContentFlattener();
flattener.parseAllYamlFiles(true);
flattener.writeToFiles();

// And generate JSON schemas to improve the developer experience
const generator = new SchemaGenerator();
generator.addSchema({ schema: SkillDefinitionSchema, schemaName: ContentType.Skill });
generator.addSchema({ schema: WorldMapDefinitionSchema, schemaName: ContentType.WorldMap });
generator.write();
