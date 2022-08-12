// ========================================================
// SAMPLE
// ========================================================
import { parse } from 'csv-parse';
import { createReadStream, createWriteStream } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
// ========================================================
// SETUP
// ========================================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
main();
// ========================================================
// FUNCTIONS
// ========================================================
async function main() {
  const soilsite_path = join(__dirname, "../data/soilsite_full.csv");
  const inputStream = createReadStream(soilsite_path, "utf8");
  const parser = inputStream.pipe(parse());
  const writer = createWriteStream(join(__dirname, "../data/sample.csv"));
  // Iterate through each records
  let count = 0;
  for await (const record of parser) {
    if (count !== 0) {
      // if random > 0.95, write to file
      if (Math.random() > 0.95) {
        writer.write(record.join(',') + '\n');
      } 
    }
    count++;
  }
}
