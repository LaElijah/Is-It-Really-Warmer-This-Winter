const redis = require('redis');
const { MongoClient } = require('mongodb');

const client = redis.createClient();
const mongoUri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection URI
const mongoDbName = 'your-db-name'; // Replace with your MongoDB database name
const mongoCollectionName = 'your-collection-name'; // Replace with your MongoDB collection name
const MAX_OBJECTS = 1000; // Replace with the maximum number of objects you want to store in Redis




// Wrap the main logic in a try-catch block to handle errors and disconnect the client properly
// Connect to the Redis client
// Connect to the MongoDB client
// is there more than "OBJECTLIMIT" objects in the redis database?
// if so, upload  to mongodb in a collection called "Unformatted-Backup"
// if not, do nothing
// disconnect the client
//


async function backupService() {
    try{ 
        await client.connect();
        const mongoClient = new MongoClient(mongoUri, { useUnifiedTopology: true });
        await mongoClient.connect();
        const db = mongoClient.db(mongoDbName);
        const collection = db.collection(mongoCollectionName);
        const keys = await client.keys('*');
        if (keys.length > MAX_OBJECTS) {
            const data = await client.MGET(keys);
            await collection.insertMany(data.map(d => JSON.parse(d)));
            await client.FLUSHDB();
        }
        await client.disconnect();
        await mongoClient.close();
    } catch (err) {
        // Handle errors, disconnect the client, and reject the promise
        console.error('Error in backupService:', err);
        await client.disconnect();
        throw err;
    }
}

module.exports = backupService;
