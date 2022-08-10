// ========================================================
// LOAD THE SOILSITE JSON
// ========================================================

// Node.js program to demonstrate the
// fs.createReadStream() method

// Include fs module
import { createReadStream } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

function main() {
  // test
  // soil_data_path ../data/soilsite_full.json
  const soil_data_path = join(__dirname, "../data/soilsite_full.json")
  console.log('soil_data_path', soil_data_path);
  
  const reader = createReadStream(soil_data_path);

  // Read and display the file data on console
  reader.on("data", function (chunk) {
    console.log(chunk.toString());
    
    debugger;
  });
}

main();
