// ========================================================
// SAMPLE
// ========================================================
import { createReadStream, createWriteStream } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {createInterface}  from "node:readline";
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
  const outputStream = createWriteStream(join(__dirname, "data/test.csv"));

  const rl = createInterface({
    input: inputStream,
  });
  let count = 0;

  for await (const line of rl) {
    if (count !== 0) {
      // if random > 0.95, write to file
      if (Math.random() > 0.95) {
        outputStream.write(line + "\n");
      }
    }
    count++;
  }
}
