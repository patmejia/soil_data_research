import {
  h3ToGeo,
  geoToH3,
  h3ToGeoBoundary,
  h3SetToMultiPolygon,
  polyfill
} from 'https://esm.sh/h3-js@3.7.2'
import * as d3 from 'https://cdn.skypack.dev/d3'
import * as topojson from 'https://cdn.skypack.dev/topojson-client'

const FEATURE = 'Feature'
const FEATURE_COLLECTION = 'FeatureCollection'
const POLYGON = 'Polygon'
const MULTI_POLYGON = 'MultiPolygon'

const w = window.innerWidth
const h = window.innerHeight
const canvas = document.getElementById('stage')
const ctx = canvas.getContext('2d')
canvas.width = w
canvas.height = h
// set canvas position to absolute
canvas.style.position = 'absolute'
canvas.style.left = '0px'
canvas.style.top = '0px'
// zindex to -1
canvas.style.zIndex = -1
const sphere = { type: 'Sphere' }
const projection = d3.geoOrthographic().fitExtent(
  [
    [10, 10],
    [w - 10, h - 10]
  ],
  sphere
)

async function start () {
  const { canvas, ctx, projection, path, sphere, world, land } =
    await setup()
  const hex1 = generateHexs(10, 1)
  const hex2 = generateHexs(105, 2)
  const hex3 = generateHexs(100, 3)
  let p1 = [randomLatitude(), randomLongitude()]
  const rf = render(hex1, hex2, hex3, sphere, land)
  while (true) {
    const p2 = [randomLatitude(), randomLongitude()]
    const h3Index = geoToH3(p2[0], p2[1], 0)
    setTitle(`${h3Index}`)
    await rotate({ p1, p2 }, rf, projection, 1000)
    await sleep(10000)
    p1 = p2
  }
}

const path = d3.geoPath(projection, ctx)
async function setup () {
  const world = await d3.json(
    'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
  )
  const land = topojson.feature(world, world.objects.land)
  const borders = topojson.mesh(
    world,
    world.objects.countries,
    (a, b) => a !== b
  )
  const countries = topojson.feature(
    world,
    world.objects.countries
  ).features

  return {
    canvas,
    ctx,
    projection,
    path,
    sphere,
    land,
    world,
    borders,
    countries
  }
}

function normalizeLayer (layer, zeroBaseline = false) {
  const hexagons = Object.keys(layer)
  // Pass one, get max (and min if needed)
  const max = hexagons.reduce((max, hex) => Math.max(max, layer[hex]), -Infinity)
  const min = zeroBaseline
    ? 0
    : hexagons.reduce((min, hex) => Math.min(min, layer[hex]), Infinity)
  // Pass two, normalize
  hexagons.forEach(hex => {
    layer[hex] = (layer[hex] - min) / (max - min)
  })
  return layer
}

function bufferPoints (geojson, radius) {
  const layer = {}
  geojson.features.forEach(feature => {
    const [lng, lat] = feature.geometry.coordinates
    const stationIndex = h3.geoToH3(lat, lng, h3Resolution)
    const ring = h3.kRing(stationIndex, radius)
    ring.forEach(h3Index => {
      layer[h3Index] = (layer[h3Index] || 0) + 1
    })
  })
  return normalizeLayer(layer, true)
}

function bufferPointsLinear (geojson, radius) {
  const layer = {}
  geojson.features.forEach(feature => {
    const [lng, lat] = feature.geometry.coordinates
    const stationIndex = h3.geoToH3(lat, lng, h3Resolution)
    // add surrounding multiple surrounding rings, with less weight in each
    const rings = h3.kRingDistances(stationIndex, radius)
    const step = 1 / (radius + 1)
    rings.forEach((ring, distance) => {
      ring.forEach(h3Index => {
        layer[h3Index] = (layer[h3Index] || 0) + 1 - distance * step
      })
    })
  })
  return normalizeLayer(layer)
}

// Transform a kilometer measurement to a k-ring radius
function kmToRadius (km) {
  return Math.floor(km / h3.edgeLength(h3Resolution, h3.UNITS.km))
}

function setTitle (data) {
  document.getElementById('title').innerHTML = `cell: ${data}`
}
function randomLatitude () {
  return Math.random() * 180 - 90
}
function randomLongitude () {
  return Math.random() * 360 - 180
}
function randomScale () {
  return Math.floor(Math.random() * 2)
}
function getPrimaryColor () {
  return (ctx.strokeStyle = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--color-aware'))
}
function getFocusColor () {
  return (ctx.strokeStyle = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--color-focus'))
}
function getAlertColor () {
  return (ctx.strokeStyle = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--color-alert'))
}
function generateHexs (count, scale) {
  // const kRing = h3.kRing(h3Index, 1);
  // const hex = h3SetToFeature(kRing);
  const coords = []
  for (let i = 0; i < count; i++) {
    coords.push([randomLatitude(), randomLongitude(), scale])
  }
  const ids = coords.map((coord) => {
    const h3Index = geoToH3(coord[0], coord[1], coord[2])
    return h3Index
  })

  const hexs = h3SetToMultiPolygonFeature(ids)
  return hexs
}

function render (hex1, hex2, hex3, sphere, land) {
  return function (arc) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath()
    path(land)
    ctx.strokeStyle = 'grey'
    ctx.lineWidth = 0.5
    ctx.stroke()

    ctx.beginPath()
    path(hex1)
    ctx.strokeStyle = getFocusColor()
    ctx.lineWidth = 2.0
    ctx.stroke()

    ctx.beginPath()
    path(hex2)
    ctx.strokeStyle = getPrimaryColor()
    ctx.lineWidth = 1.0
    ctx.stroke()

    ctx.beginPath()
    path(hex3)
    ctx.strokeStyle = getAlertColor()
    ctx.lineWidth = 1.0
    ctx.stroke()

    ctx.beginPath()
    path(sphere)
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2.0
    ctx.stroke()

    ctx.beginPath(),
    path(arc),
    (ctx.strokeStyle = '#fff'),
    (ctx.lineWidth = 2.0),
    ctx.stroke()
  }
}
function rotate ({ p1, p2 }, render, projection, durration) {
  const tilt = 0

  const r1 = [-p1[0], tilt - p1[1], 0]
  const r2 = [-p2[0], tilt - p2[1], 0]
  const ip = d3.geoInterpolate(p1, p2)
  const iv = Versor.interpolateAngles(r1, r2)
  return d3
    .transition()
    .duration(durration)
    .tween('render', () => (t) => {
      projection.rotate(iv(t))
      render({ type: 'LineString', coordinates: [p1, ip(t)] })
    })
    .transition()
    .tween('render', () => (t) => {
      render({ type: 'LineString', coordinates: [ip(t), p2] })
    })
    .end()
}

async function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function flatten (arrays) {
  let out = null
  for (let i = 0; i < arrays.length; i++) {
    if (out !== null) {
      for (let j = 0; j < arrays[i].length; j++) {
        out.push(arrays[i][j])
      }
    } else {
      out = arrays[i]
    }
  }
  return Array.from(new Set(out))
}

function centroid (polygon) {
  let lngSum = 0
  let latSum = 0
  let count = 0
  const loop = polygon[0]
  for (let i = 0; i < loop.length; i++) {
    lngSum += loop[i][0]
    latSum += loop[i][1]
    count++
  }
  return [lngSum / count, latSum / count]
}

function featureCollectionToH3Set (featureCollection, resolution) {
  const { features } = featureCollection
  if (!features) {
    throw new Error('No features found')
  }
  return flatten(
    features.map((feature) => featureToH3Set(feature, resolution))
  )
}

function featureToH3Set (feature, resolution, options = {}) {
  const { type, geometry } = feature
  const geometryType = geometry && geometry.type

  if (type === FEATURE_COLLECTION) {
    return featureCollectionToH3Set(feature, resolution)
  }

  if (type !== FEATURE) {
    throw new Error(`Unhandled type: ${type}`)
  }
  if (geometryType !== POLYGON && geometryType !== MULTI_POLYGON) {
    throw new Error(`Unhandled geometry type: ${geometryType}`)
  }

  // Normalize to MultiPolygon
  const polygons =
    geometryType === POLYGON
      ? [geometry.coordinates]
      : geometry.coordinates

  // Polyfill each polygon and flatten the results
  return flatten(
    polygons.map((polygon) => {
      const result = polyfill(polygon, resolution, true)
      if (result.length || !options.ensureOutput) {
        return result
      }
      // If we got no results, index the centroid
      const [lng, lat] = centroid(polygon)
      return [geoToH3(lat, lng, resolution)]
    })
  )
}

function h3ToFeature (h3Index, properties = {}) {
  // Wrap in an array for a single-loop polygon
  const coordinates = [h3ToGeoBoundary(h3Index, true)]
  return {
    type: FEATURE,
    id: h3Index,
    properties,
    geometry: {
      type: POLYGON,
      coordinates
    }
  }
}

function h3SetToFeature (hexagons, properties = {}) {
  const polygons = h3SetToMultiPolygon(hexagons, true)
  // See if we can unwrap to a simple Polygon.
  const isMultiPolygon = polygons.length > 1
  const type = isMultiPolygon ? MULTI_POLYGON : POLYGON
  // MultiPolygon, single polygon, or empty array for an empty hex set
  const coordinates = isMultiPolygon ? polygons : polygons[0] || []
  return {
    type: FEATURE,
    properties,
    geometry: {
      type,
      coordinates
    }
  }
}

function h3SetToMultiPolygonFeature (hexagons, properties = {}) {
  const coordinates = hexagons.map((h3Index) =>
    // Wrap in an array for a single-loop polygon
    [h3ToGeoBoundary(h3Index, { geoJson: true })]
  )
  return {
    type: FEATURE,
    properties,
    geometry: {
      type: MULTI_POLYGON,
      coordinates
    }
  }
}

function h3SetToFeatureCollection (hexagons, getProperties) {
  const features = []
  for (let i = 0; i < hexagons.length; i++) {
    const h3Index = hexagons[i]
    const properties = getProperties ? getProperties(h3Index) : {}
    features.push(h3ToFeature(h3Index, properties))
  }
  return {
    type: FEATURE_COLLECTION,
    features
  }
}

  // Transform the current hexagon map into a GeoJSON object
  const geojson = geojson2h3.h3SetToFeatureCollection(
    Object.keys(hexagons),
    hex => ({value: hexagons[hex]})
  );
