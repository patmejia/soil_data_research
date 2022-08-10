
// soil_data_path ../data/soilsite_full.json
const soil_data_path = join(__dirname, "../data/soilsite_full.json")
console.log('soil_data_path', soil_data_path);

createReadStream(soil_data_path)
.pipe(ndjson.parse())
.on('data', function(obj) {
  // obj is a javascript object
  debugger;
})

const reader = createReadStream(soil_data_path);

// Read and display the file data on console
reader.on("data", function (chunk) {
  console.log(chunk.toString());

match("longitude_wgs84_dd" : -6.280505") as regex
const regex = /longitude_wgs84_dd" : (-?\d+\.\d+)/g;
const matches = chunk.toString().match(regex);
// for each match get the first group
matches.forEach(match => {
  console.log(match.match(/-?\d+\.\d+/)[0]);
});
console.log('matches', matches);
"latitude_wgs84_dd" : 12.51425667,
});
