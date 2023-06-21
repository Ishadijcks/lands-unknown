import fs from "fs";

export class EnumCreator {
  template: string = `// This file is generated from create-enums.ts, please do not edit it directly
import { z } from "zod";

export const ENUMNAMESchema = z.enum([BODY]);
export type ENUMNAME = z.infer<typeof ENUMNAMESchema>;
`;

  public writeEnum(enumName: string, entries: any[]) {
    const body = entries.map((entry) => `"${entry.hrid}"`).join(",");
    const enumText = this.template.replaceAll("ENUMNAME", enumName).replace("BODY", body);
    fs.writeFileSync(`./content/${enumName}.ts`, enumText);
  }
}
