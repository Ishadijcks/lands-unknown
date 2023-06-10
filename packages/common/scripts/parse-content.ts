import { glob } from "glob";
import * as fs from "fs";
import { parse } from "yaml";
import { SkillDefinitionParser } from "common/parsers/skill/SkillDefinitionSchema";
import { ContentType } from "common/parsers/ContentType";
import { BaseContentParser } from "common/parsers/BaseContentParser";
import { GameContent } from "common/parsers/GameContent";

export class ContentFlattener {
  content: Required<GameContent> = {
    skills: [],
    items: [],
    actions: [],
    activities: [],
  };

  private addContent(content: GameContent): void {
    this.content.skills.push(...(content.skills ?? []));
    this.content.items.push(...(content.items ?? []));
    this.content.actions.push(...(content.actions ?? []));
    this.content.activities.push(...(content.activities ?? []));
  }

  contentParsers: Record<ContentType, BaseContentParser> = {
    [ContentType.Skill]: new SkillDefinitionParser(),
  };

  private getAllYamlFiles(): { contentType: ContentType; fileName: string; data: any }[] {
    // TODO(@Isha): Fix resolution path
    const contentPath = require.resolve("content").replace("/index.ts", "");
    console.log("Loading content from", contentPath);

    const filePaths = glob.sync(`${contentPath}/**/*.yaml`, {});
    console.log(`Reading ${filePaths.length} files`);
    return filePaths.map((filePath) => {
      // TODO(@Isha): Cleanup
      const contentType = filePath.replace(".yaml", "").split(".").pop() as ContentType;
      const fileName = filePath.split("/").pop() as string;

      console.log(filePath, contentType);
      return {
        contentType: contentType,
        fileName: fileName,
        data: parse(fs.readFileSync(filePath, "utf8")),
      };
    });
  }

  public parseAllYamlFiles(): void {
    const files = this.getAllYamlFiles();
    files.forEach((yaml) => {
      const parser = this.contentParsers[yaml.contentType];
      if (!parser) {
        throw new Error(`Unrecognized contentType '${yaml.contentType}' in file '${yaml.fileName}'`);
      }

      // const zodResult = parser.schema.safeParse(data);
      // if (!zodResult.success) {
      //   console.log(zodResult.error);
      //   throw new Error(`Could not load file '${fileName}'`);
      // }

      try {
        const newContent = parser.apply(yaml.data);

        this.addContent(newContent);
      } catch (e) {
        console.error(e);
        throw new Error(`Could not parse file ${yaml.fileName}, is it valid yaml?`);
      }
    });
  }

  public writeToFiles(): void {
    Object.keys(this.content).forEach((key) => {
      // @ts-ignore
      const entries = this.content[key];
      console.log(`Loaded ${entries.length} ${key}`);

      const entryMap: any = {};
      entries.forEach((entry: any) => {
        entryMap[entry.hrid] = entry;
      });

      console.log(entryMap);

      fs.writeFileSync(`./content/${key}.json`, JSON.stringify(entryMap));
    });
  }
}
