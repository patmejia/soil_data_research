// ========================================================
// LOAD THE SOILSITE CSV INTO SQLITE DATABASE
// ========================================================
import sqlite3 from 'sqlite3'
import { parse } from 'csv-parse'
import { createReadStream } from 'node:fs'
import {latLngToCell, cellsToMultiPolygon} from "h3-js";
import{h3SetToFeatureCollection} from 'geojson2h3'
// import { EOL } from 'node:os'

// ========================================================
// SETUP
// ========================================================
const SQLite3 = sqlite3.verbose()
let db

// ========================================================
// FUNCTIONS
// ========================================================
async function startDB (dataToLoadPath, location = ':memory:') {
  db = new SQLite3.Database(location)
  await serial(load, dataToLoadPath)
  return 'ok'
}

async function getPointsInQuadrant (lat, lon, lat2, lon2) {
  const selectSql = `SELECT * FROM soilsite WHERE lat > ${lat} AND lat < ${lat2} AND lon > ${lon} AND lon < ${lon2}`
  const result = await query(selectSql)
  return result
}

async function stopDB () {
  db.close()
}

async function load (dataToLoad) {
  const inputStream = createReadStream(dataToLoad, 'utf8')
  const parser = inputStream.pipe(parse())
  const createSql = 'CREATE TABLE soilsite (id TEXT, lat REAL, lon REAL)'
  db.run(createSql)
  const insertSql = 'INSERT INTO soilsite VALUES (?, ?, ?)'
  const state = db.prepare(insertSql)
  let count = 0
  // Iterate through each records
  for await (const record of parser) {
    if (count !== 0) {
      state.run(record[0], record[10], record[11])
      // console.log('inserted', count);
    }
    count++
  }
  state.finalize()
}

const query = (command, method = 'all') => {
  return new Promise((resolve, reject) => {
    db[method](command, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

function serial (f, ...args) {
  return new Promise((resolve, reject) => {
    db.serialize(async () => {
      try {
        await f(...args)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  })
}

function pointToH3Cell (lat, lon, resolution = 7) {
  const result = latLngToCell(lat, lon, resolution)
  return result
}

function pointsToH3Cells(points, resolution = 7) {
  let cells = {}
  for(const point in points) {
    const cell = pointToH3Cell(points[point][0], points[point][1], resolution)
    if(cells[cell]) {
      cells[cell]++
    }
    else {
      cells[cell] = 1
    }
  }
  return cells
}

function cellsToGeoJson(cells) {

    // Transform the current hexagon map into a GeoJSON object
    const geojson = h3SetToFeatureCollection(
      Object.keys(cells),
      hex => ({value: cells[hex]})
    );
  return geojson
}

// ===================================================
// "unhandled" ERROR HANDLING
// ===================================================
process.on('unhandledRejection', (error) => {
  stopDB()
  throw error
})

process.on('uncaughtException', (error) => {
  stopDB()
  throw error
})

export { startDB, stopDB, getPointsInQuadrant, pointToH3Cell, pointsToH3Cells, cellsToGeoJson }

// const start_timestamp = Date.now();
// setInterval(() => {
//   const mu = process.memoryUsage();
//   // # bytes / KB / MB / GB
//   const gbNow = mu["heapUsed"] / 1024 / 1024;
//   const gbRounded = Math.round(gbNow * 100) / 100;

//   const elapsedTimeInSecs = (Date.now() - start_timestamp) / 1000;
//   const timeRounded = Math.round(elapsedTimeInSecs * 100) / 100;

//   console.log(gbRounded + EOL); // fire-and-forget
// }, 100);
