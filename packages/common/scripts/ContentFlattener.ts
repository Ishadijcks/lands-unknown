import { glob } from "glob";
import * as fs from "fs";
import { parse } from "yaml";
import { SkillDefinitionParser } from "common/parsers/skill/SkillDefinitionSchema";
import { ContentType } from "common/parsers/ContentType";
import { BaseContentParser } from "common/parsers/BaseContentParser";
import { GameContent } from "common/parsers/GameContent";
import * as process from "process";

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

  public validateUniqueHrids(): void {
    const areAllUnique = (items: any[]) => {
      const hrids = items.map((item) => item.hrid);
      const duplicates = hrids.filter((item, index, array) => array.indexOf(item) !== index);

      if (duplicates.length > 0) {
        const message = duplicates.join(", ");
        throw new Error(`Duplicate ids encountered: '${message}'`);
      }
    };

    Object.keys(this.content).forEach((key) => {
      // @ts-ignore
      const entries = this.content[key];
      areAllUnique(entries);
    });
  }

  contentParsers: Record<ContentType, BaseContentParser> = {
    [ContentType.Skill]: new SkillDefinitionParser(),
  };

  private getAllYamlFiles(): { contentType: ContentType; fileName: string; data: any }[] {
    // TODO(@Isha): Fix resolution path
    const contentPath = require.resolve("content").replace("/index.ts", "");

    const filePaths = glob.sync(`${contentPath}/**/*.yaml`, {});
    console.log(`Reading ${filePaths.length} files from`, contentPath);
    return filePaths.map((filePath) => {
      // TODO(@Isha): Cleanup
      const contentType = filePath.replace(".yaml", "").split(".").pop() as ContentType;
      const fileName = filePath.split("/").pop() as string;

      return {
        contentType: contentType,
        fileName: fileName,
        data: parse(fs.readFileSync(filePath, "utf8")),
      };
    });
  }

  public parseAllYamlFiles(validate: boolean = false): void {
    const files = this.getAllYamlFiles();
    files.forEach((yaml) => {
      const parser = this.contentParsers[yaml.contentType];
      if (!parser) {
        throw new Error(`Unrecognized contentType '${yaml.contentType}' in file '${yaml.fileName}'`);
      }

      try {
        const newContent = parser.apply(yaml.data);

        if (validate) {
          const zodResult = parser.schema.safeParse(yaml.data);
          if (!zodResult.success) {
            console.error(zodResult.error);
            console.error(`Could not load file '${yaml.fileName}'`);
            process.exit(1);
          }
          this.addContent(zodResult.data);
        } else {
          this.addContent(newContent);
        }
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

      fs.writeFileSync(`./content/generated/${key}.json`, JSON.stringify(entryMap));
    });
  }
}
