import * as fs from "fs";
import { zodToJsonSchema } from "zod-to-json-schema";
import { ZodSchema } from "zod";

interface SchemaGeneration {
  schema: ZodSchema;
  schemaName: string;
}

export class SchemaGenerator {
  public readonly OUTPUT_DIR = "../../schemas";
  configs: SchemaGeneration[] = [];

  addSchema(config: SchemaGeneration) {
    this.configs.push(config);
  }

  write(): void {
    if (!fs.existsSync(this.OUTPUT_DIR)) {
      fs.mkdirSync(this.OUTPUT_DIR);
    }

    this.configs.forEach((config) => {
      const jsonSchema = zodToJsonSchema(config.schema, config.schemaName);
      fs.writeFileSync(`${this.OUTPUT_DIR}/${config.schemaName}.schema.json`, JSON.stringify(jsonSchema));
    });
  }
}
