import fs from "fs";

export class HridCreator {
  lines: string[] = ["// This file is generated from HridCreator.ts, please do not edit it directly"];

  template: string = `
export const ENUMNAME = [BODY] as const;
`;

  public addHrids(enumName: string, entries: any[]) {
    const body = entries.map((entry) => `"${entry.hrid}"`).join(",");
    const enumText = this.template.replaceAll("ENUMNAME", enumName).replace("BODY", body);
    this.lines.push(enumText);
  }

  public write(): void {
    const content = this.lines.join("\n");
    fs.writeFileSync(`./content/hrids.ts`, content);
  }
}
