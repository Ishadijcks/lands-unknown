import * as fs from "fs";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ZodSchema } from "zod";
import { SkillDefinitionSchema } from "common/parsers/skill/SkillDefinitionSchema";

interface SchemaGeneration {
  schema: ZodSchema;
  schemaName: string;
}

const schemaConfigs: SchemaGeneration[] = [{ schema: SkillDefinitionSchema, schemaName: "skill" }];

const OUTPUT_DIR = "./schemas";

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}
schemaConfigs.forEach((config) => {
  const jsonSchema = zodToJsonSchema(config.schema, config.schemaName);
  fs.writeFileSync(`${OUTPUT_DIR}/${config.schemaName}.schema.json`, JSON.stringify(jsonSchema));
});
