import { ContentFlattener } from "common/scripts/parse-content";
import { EnumCreator } from "common/scripts/create-enums";

// First we load all yaml files to json
const flattener = new ContentFlattener();
flattener.parseAllYamlFiles();
flattener.writeToFiles();

const content = flattener.content;

// Then we can generate enum files per content types
const enumCreator = new EnumCreator();
enumCreator.writeEnum("ItemHrid", content.items);
enumCreator.writeEnum("SkillHrid", content.skills);
enumCreator.writeEnum("ActionHrid", content.actions);
enumCreator.writeEnum("ActivityHrid", content.activities);

// Such that we can validate all content with Zod

// And generate JSON schemas to improve the developer experience
