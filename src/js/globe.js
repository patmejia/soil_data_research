import D3Node from "d3-node";
import { geoOrthographic, geoPath } from "d3-geo";
import canvasModule from "canvas";
import topojson from "topojson";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function plot(polygon) {
  const d3n = new D3Node({ canvasModule }); // pass it node-canvas
  const w = 800;
  const h = 1000;
  const canvas = d3n.createCanvas(w, h);
  const ctx = canvas.getContext("2d");
  const sphere = { type: "Sphere" };
  const projection = geoOrthographic().fitExtent(
    [
      [10, 10],
      [w - 10, h - 10],
    ],
    sphere
  );
  const worldDataPath = join(__dirname, "../../data/world.json");
  const result = await readFile(worldDataPath);
  const world = JSON.parse(result);
  const land = topojson.feature(world, world.objects.land);
  // const borders = topojson.mesh(
  //   world,
  //   world.objects.countries,
  //   (a, b) => a !== b
  // );
  // const countries = topojson.feature(world, world.objects.countries).features;

  const p1 = polygon.features[0].geometry.coordinates[0][0];
  // projection.rotate([-p1[0], -p1[1]]);
  projection.rotate([30, -30]);
  ctx.fillStyle = "#fff";

  const path = geoPath(projection, ctx);

  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  path(land);
  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = 0.5;
  ctx.stroke();
  
  // for each feature in polygone.features
  for (let i = 0; i < polygon.features.length; i++) {
    const feature = polygon.features[i];
    const value = feature.properties.value;
    console.log('value', value);
    
    const color = getColorFromValue(value);
    ctx.beginPath();
    path(feature);
    // ctx.fillStyle = "#ff0";
    // ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.0;
    ctx.stroke();
  }

  ctx.beginPath();
  path(sphere);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2.0;
  ctx.stroke();

  // PNG-encoded, zlib compression level 3 for faster compression but bigger files, no filtering
  const buf2 = canvas.toBuffer("image/png", {
    compressionLevel: 3,
    filters: canvas.PNG_FILTER_NONE,
  });
  await writeFile(join(__dirname, "../../test/screenshots/test.png"), buf2);
  return buf2;
}

function getHsl(h, s, l) {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function getColorFromValue(value) {
  let h = 0;
  if(value > 1)
    h = 100;
  if (value > 5) {
    h = 200;
  }
  if (value > 20) {
    h = 300;
  }

  const s = 50;
  const l = 50;
  return getHsl(h, s, l);
}

export { plot };
