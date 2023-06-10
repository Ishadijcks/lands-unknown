import { ZodSchema } from "zod";
import { GameContent } from "common/parsers/GameContent";

export abstract class BaseContentParser {
  abstract schemaName: string;
  abstract schema: ZodSchema;

  abstract apply(data: any): GameContent;
}
