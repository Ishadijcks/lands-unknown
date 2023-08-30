import { ContentFlattener } from "common/scripts/ContentFlattener";
import { HridCreator } from "common/scripts/HridCreator";
import { TiledParser } from "common/scripts/TiledParser";
import { TiledMapRepository } from "common/game/worldmap/TiledMapRepository";
import { stringify } from "yaml";
import fs from "fs";
import { TiledMap } from "common/game/worldmap/tiled/TiledMap";

// Load all information from tiled maps and write to yamls
const contentPath = require.resolve("content").replace("/index.ts", "");
TiledMapRepository.getAll().forEach(({ name, tiledMap }) => {
  const tiledParser = new TiledParser([tiledMap]);
  const details = tiledParser.parse();
  const yaml = stringify(details, { aliasDuplicateObjects: false });
  fs.writeFileSync(`${contentPath}/generated/${name}.worldmap.yaml`, yaml);
});

// We load all yaml files to see if they are valid
const flattener = new ContentFlattener();
flattener.parseAllYamlFiles();
flattener.validateUniqueHrids();

const content = flattener.content;

// Then we can generate hrid lists per content type;
const hridCreator = new HridCreator();
hridCreator.addHrids("itemHrids", content.items);
hridCreator.addHrids("skillHrids", content.skills);
hridCreator.addHrids("actionHrids", content.actions);
hridCreator.addHrids("activityHrids", content.activities);
hridCreator.addHrids("locationHrids", content.locations);
hridCreator.addHrids("roadHrids", content.roads);
hridCreator.write();

// See content-validate.ts for the next steps
