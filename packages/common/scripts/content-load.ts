import { ContentFlattener } from "common/scripts/ContentFlattener";
import { HridCreator } from "common/scripts/HridCreator";
import { TiledParser } from "common/scripts/TiledParser";
import { TiledMapRepository } from "common/game/worldmap/TiledMapRepository";
import { stringify } from "yaml";
import fs from "fs";

// Load all information from tiled maps and write to yamls
const contentPath = require.resolve("content").replace("/index.ts", "");

const allLocations: string[] = [];
TiledMapRepository.getAll().forEach(({ name, tiledMap }) => {
  const tiledParser = new TiledParser([tiledMap]);
  const details = tiledParser.parse();
  allLocations.push(...details.locations);
  const yaml = stringify({ roads: details.roads, actions: details.actions }, { aliasDuplicateObjects: false });
  fs.writeFileSync(`${contentPath}/generated/${name}.worldmap.yaml`, yaml);
});

// We load all yaml files to see if they are valid
const flattener = new ContentFlattener();
flattener.parseAllYamlFiles();
flattener.validateUniqueHrids();

const content = flattener.content;

allLocations.forEach((locationHrid) => {
  const location = content.locations.find((location) => location.hrid === locationHrid);
  if (!location) {
    throw new Error(`The Tiled map defines hrid ${locationHrid}, but it is not defined in a worldmap.yaml`);
  }
});

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
