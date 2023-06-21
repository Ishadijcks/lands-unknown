import { ContentFlattener } from "common/scripts/ContentFlattener";
import { HridCreator } from "common/scripts/HridCreator";

// First we load all yaml files to json
const flattener = new ContentFlattener();
flattener.parseAllYamlFiles();
flattener.validateUniqueHrids();
flattener.writeToFiles();

const content = flattener.content;

// Then we can generate enum files per content types
const enumCreator = new HridCreator();
enumCreator.addHrids("itemHrids", content.items);
enumCreator.addHrids("skillHrids", content.skills);
enumCreator.addHrids("actionHrids", content.actions);
enumCreator.addHrids("activityHrids", content.activities);
enumCreator.write();
// See content-validate.ts for the next steps
