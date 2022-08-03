const { MongoClient } = require("mongodb");



// Connection URI
const uri =
  "mongodb://soilspec4gg:soilspec4gg@api.soilspectroscopy.org/soilspec4gg?ssl=true";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    const cursor = client.db.collection("AfSIS1").find()
    cursor.each(function(err, doc) {
      console.log(doc);
    });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
