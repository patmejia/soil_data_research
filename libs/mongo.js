// @ts-check
import { MongoClient } from "mongodb";
import { readFileSync } from "fs";

// Connection URI
const url =
"mongodb://soilspec4gg:soilspec4gg@api.soilspectroscopy.org:27017/?ssl=true&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=soilspec4gg&authMechanism=SCRAM-SHA-256"
// Read the certificate authority
// var ca = readFileSync("./lets-encrypt-r3.pem");

// Database Name
const dbName = 'soilspec4gg';
// Connect using MongoClient
MongoClient.connect(url,{
  // sslCA : ca,
},
   function(err, client) {
  if (err) {
    // log th error
    console.log(err);
    throw err;
  }
  const db = client.db(dbName);
  client.close();
});

// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     console.log("Connected to server");

//     // Establish and verify connection
//     const cursor = client.db("soilspec4gg").collection("soillab").find();
//     cursor.forEach(function(doc) {
//       console.log(doc);
//     });

//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


