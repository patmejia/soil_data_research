// ========================================================
// LOAD THE SOILSITE CSV INTO SQLITE DATABASE
// ========================================================
import sqlite3 from "sqlite3";
import { parse } from 'csv-parse';
import { createReadStream } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// ========================================================
// SETUP
// ========================================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SQLite3 = sqlite3.verbose();
const db = new SQLite3.Database(':memory:');
main();
// ========================================================
// FUNCTIONS
// ========================================================
async function main() {
  await serial(load)
  const amount = 10
  // const selectSql = `SELECT * FROM soilsite LIMIT ${amount}`
  // select points > lat=40.7 and lon=-74.0
  const selectSql2 = `SELECT * FROM soilsite WHERE lat > 10.7 AND lat < 30.0 limit ${amount}`
  const result = await query(selectSql2);
  console.log(result);
  db.close();
}

async function load() {
  const soilsite_path = join(__dirname, "../data/soilsite_full.csv");
  const inputStream = createReadStream(soilsite_path, "utf8");
  const parser = inputStream.pipe(parse());
  const createSql = `CREATE TABLE soilsite (id TEXT, lat REAL, lon REAL)`;
  db.run(createSql);
  const insertSql = `INSERT INTO soilsite VALUES (?, ?, ?)`
  const state = db.prepare(insertSql);
  let count = 0;
  // Iterate through each records
  for await (const record of parser) {
    if (count !== 0) {
      state.run(record[0], record[10], record[11]);
      // console.log('inserted', count);
      
    }
    count++;
  }
  state.finalize();
}

const query = (command, method = 'all') => {
  return new Promise((resolve, reject) => {
    db[method](command, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

function serial(f) {
  return new Promise((resolve, reject) => {
    db.serialize(async () => {
      await f();
      resolve();
    });
  });
}