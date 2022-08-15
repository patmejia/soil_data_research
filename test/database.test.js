// ========================================================
// IMPORTS
// ========================================================
import {
  startDB,
  stopDB,
  getPointsInQuadrant,
  pointToH3Cell,
  pointsToH3Cells,
  cellsToGeoJson,
} from "../src/js/database.js";
import {plot} from "../src/js/globe.js";

import { test, configure } from "brittle";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";


// ========================================================
// SETUP
// ========================================================
configure({ serial: true });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ========================================================
// TEST
// ========================================================
test("start database", async (t) => {
  const soilDataPath = join(__dirname, "data/test.csv");
  const result = await startDB(soilDataPath);
  t.is("ok", result);
});

test("send a bad query expect error", async (t) => {
  t.exception(getPointsInQuadrant("bad query"));
});

test("select points from the sql database", async (t) => {
  const corners = [35.14, -11.12, 36.5, -6.1];
  const points = await getPointsInQuadrant(...corners);
  t.snapshot(points);
});

test("pointToH3Cell", async (t) => {
  const point = [20.0, -30.0];
  const cell = await pointToH3Cell(...point);
  t.is(cell, "875772362ffffff");
});

test("pointToH3Cell", async (t) => {
  const point = [20.0, -30.0];
  const cell = await pointToH3Cell(...point);
  t.is(cell, "875772362ffffff");
});

test("pointsToH3Cells", async (t) => {
  const points = [
    [20.0, -30.0],
    [20.0, -30.01],
    [40.0, 10.0],
    [40.0, 9.99],
  ];
  const cells = await pointsToH3Cells(points);
  t.snapshot(cells);
});

test("cellsToMultiPolygon", async (t) => {
  const cells = {
    "875772362ffffff": 2,
    "871e90110ffffff": 2,
  };
  const polygon = await cellsToGeoJson(cells);
  t.snapshot(polygon);
});

test("plot the cells on a map", async (t) => {
  const corners = [-90, -90, 90, 90];
  const soil_points = await getPointsInQuadrant(...corners);
  // const first_point = [soil_points[0], soil_points[1]];
  // conver each soil point to a cell {lat,lon} -> [y,x]
  const points = soil_points.map((point) => {
    return [point.lon, point.lat];
  })
  const cells = await pointsToH3Cells(points,3);
  const polygon = await cellsToGeoJson(cells);
  // let points = []
  // // create 1000 random points between [20,-30] and [40,10]
  // for (let i = 0; i < 1; i++) {
  //   points.push([
  //     random(0, 50),
  //     random(-120, -70),
  //   ])
  // }
  // const cells = pointsToH3Cells(points, 1)
  // const polygon = await cellsToGeoJson(cells);
  const image = await plot(polygon);
  t.ok(image);
});

test("stop database", async (t) => {
  await stopDB();
  t.pass("database stopped");
});

// ========================================================
// HELPERS
// ========================================================
function random(min, max) {
  return Math.random() * (max - min) + min;
}