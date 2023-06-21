import { ContentFlattener } from "common/scripts/ContentFlattener";
import { EnumCreator } from "common/scripts/EnumCreator";

// First we load all yaml files to json
const flattener = new ContentFlattener();
flattener.parseAllYamlFiles();
flattener.validateUniqueHrids();
flattener.writeToFiles();

const content = flattener.content;

// Then we can generate enum files per content types
const enumCreator = new EnumCreator();
enumCreator.writeEnum("ItemHrid", content.items);
enumCreator.writeEnum("SkillHrid", content.skills);
enumCreator.writeEnum("ActionHrid", content.actions);
enumCreator.writeEnum("ActivityHrid", content.activities);

// See content-validate.ts for the next steps
