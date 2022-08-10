// ========================================================
// LOAD THE SOILSITE CSV INTO SQLITE DATABASE
// ========================================================
import sqlite3 from "sqlite3";
import { createReadStream } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import CsvReadableStream from "csv-reader";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  const soilsite_path = join(__dirname, "../data/soilsite_full.csv");
  const inputStream = createReadStream(soilsite_path, "utf8");

  const db = new sqlite3.Database(":memory:");

  db.serialize(() => {
    // sqlite create table with string id, lat, long, and depth
    db.run(`CREATE TABLE soilsite (id TEXT, lat REAL, long REAL)`);
    const stmt = db.prepare("INSERT INTO soilsite VALUES (?, ?, ?)");

    let counter = 0;
    inputStream
      .pipe(
        new CsvReadableStream({
          parseNumbers: true,
          parseBooleans: true,
          trim: true,
        })
      )
      .on("data", function (row) {
        if (counter > 0) {
          stmt.run(row[0], row[10], row[11]);
        }
        counter++;
      })
      .on("end", function () {
        stmt.finalize();
        db.each("SELECT * FROM soilsite LIMIT 10", (err, row) => {
          console.log(row.id + ": " + row.lat + ", " + row.long);
        });
        db.close();
      });
  });

}

main();