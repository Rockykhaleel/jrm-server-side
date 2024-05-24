const { MongoClient } = require("mongodb");

async function getUniqueYears() {
  try {
    // Connection URI
    const uri = process.env.connection_string2; // Use your MongoDB connection string

    // Connect to MongoDB
    const client = await MongoClient.connect(uri, {
      // Remove the deprecated options
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    // console.log("Connected to MongoDB");

    // Get reference to the database
    const db = client.db(process.env.database_name); // Use your database name

    // Define an empty array to store unique years
    const uniqueYears = [];

    // Retrieve a list of all collections
    const collections = await db.listCollections().toArray();

    // Iterate through each collection
    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      // Query for documents that contain the "createdAt" field
      const documentsWithCreatedAt = await db
        .collection(collectionName)
        .find({ createdAt: { $exists: true } }, { _id: 0, createdAt: 1 })
        .toArray();

      // Iterate through documents
      for (const doc of documentsWithCreatedAt) {
        // Extract year from createdAt field
        const year = new Date(doc.createdAt).getFullYear();

        // Check if year is not already in uniqueYears array
        if (!uniqueYears.includes(year)) {
          // Print the year
          //   console.log(year);
          return year;
          // Add the year to uniqueYears array to avoid duplicates
          uniqueYears.push(year);
        }
      }
    }

    // Close the MongoDB connection
    await client.close();
  } catch (err) {
    console.error("Error:", err);
    throw err; // Rethrow the error for handling at a higher level
  }
}

module.exports = { getUniqueYears };
