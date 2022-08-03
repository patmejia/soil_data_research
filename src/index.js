const { MongoClient } = require("mongodb");

Name: soilspec4gg
Address: api.soilspectroscopy.org
Database: soilspec4gg
Username: soilspec4gg
Password: soilspec4gg

// Connection URI
const uri =
  "mongodb+srv://sample-hostname:27017/?maxPoolSize=20&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
