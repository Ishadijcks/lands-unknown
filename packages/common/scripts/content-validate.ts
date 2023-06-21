import { ContentFlattener } from "common/scripts/ContentFlattener";

// Such that we can validate all content with Zod
const flattener = new ContentFlattener();
flattener.parseAllYamlFiles(true);

// And generate JSON schemas to improve the developer experience
