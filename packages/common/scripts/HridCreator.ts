import fs from "fs";

export class HridCreator {
  lines: string[] = ["// This file is generated from HridCreator.ts, please do not edit it directly"];

  template: string = `
export const TYPE = [CONTENT] as const;
`;

  public addHrids(type: string, entries: any[]) {
    const content = entries.map((entry) => `"${entry.hrid}"`).join(",");
    const enumText = this.template.replaceAll("TYPE", type).replace("CONTENT", content);
    this.lines.push(enumText);
  }

  public write(): void {
    const content = this.lines.join("\n");
    fs.writeFileSync(`./content/generated/hrids.ts`, content);
  }
}
