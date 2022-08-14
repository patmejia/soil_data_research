// ========================================================
// IMPORTS
// ========================================================
import { startDB, stopDB, getPointsInQuadrant, pointToH3Cell, pointsToH3Cells, cellsToGeoJson } from '../src/js/database.js'
import { test, configure } from 'brittle'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import {d3} from 'd3-node'
const canvasModule = require('canvas'); // supports node-canvas v1 & v2.x
const d3n = new D3Node({ canvasModule }); // pass it node-canvas
const canvas = d3n.createCanvas(960, 500);
const context = canvas.getContext('2d');
// draw on your canvas, then output canvas to png
canvas.pngStream().pipe(fs.createWriteStream('output.png'));

// ========================================================
// SETUP
// ========================================================
configure({ serial: true })
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ========================================================
// TEST
// ========================================================
test('start database', async (t) => {
  const soilDataPath = join(__dirname, 'data/test.csv')
  const result = await startDB(soilDataPath)
  t.is("ok",result)
})

test('send a bad query expect error', async (t) => {
  t.exception(getPointsInQuadrant('bad query'))
})

test('select points from the sql database', async (t) => {
  const corners = [35.14, -11.12, 36.50, -6.10]
  const points = await getPointsInQuadrant(...corners)
  t.snapshot(points)
})

test('pointToH3Cell', async (t) => {
  const point = [20.0, -30.0]
  const cell = await pointToH3Cell(...point)
  t.is(cell, '875772362ffffff')
})

test('pointToH3Cell', async (t) => {
  const point = [20.0, -30.0]
  const cell = await pointToH3Cell(...point)
  t.is(cell, '875772362ffffff')
})

test('pointsToH3Cells', async (t) => {
  const points = [
    [20.0, -30.0], 
    [20.0, -30.01], 
    [40.0, 10.0], 
    [40.0, 9.99]
  ]
  const cells = await pointsToH3Cells(points)
  t.snapshot(cells)
})

test('cellsToMultiPolygon', async (t) => {
  const cells = {
    "875772362ffffff": 2,
    "871e90110ffffff": 2
  }
  const polygon = await cellsToGeoJson(cells)
  t.snapshot(polygon)
})

// test('plot the cells on a map', async (t) => {
//   const cells = {
//     "875772362ffffff": 2,
//     "871e90110ffffff": 2
//   }
//   const polygon = await cellsToGeoJson(cells)
//   t.snapshot(polygon)
// })

test('stop database', async (t) => {
  await stopDB()
  t.pass("database stopped")
})