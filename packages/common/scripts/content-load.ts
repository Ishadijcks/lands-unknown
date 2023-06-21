import { ContentFlattener } from "common/scripts/ContentFlattener";
import { HridCreator } from "common/scripts/HridCreator";

// First we load all yaml files to json
const flattener = new ContentFlattener();
flattener.parseAllYamlFiles();
flattener.validateUniqueHrids();
flattener.writeToFiles();

const content = flattener.content;

// Then we can generate hrid lists per content type;
const hridCreator = new HridCreator();
hridCreator.addHrids("itemHrids", content.items);
hridCreator.addHrids("skillHrids", content.skills);
hridCreator.addHrids("actionHrids", content.actions);
hridCreator.addHrids("activityHrids", content.activities);
hridCreator.write();

// See content-validate.ts for the next steps
