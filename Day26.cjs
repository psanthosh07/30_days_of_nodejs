const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'test_2';
const collectionName = 's1';

async function getProductStatistics() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        const result = await collection.aggregate([
            {
                $group: {
                    _id: null,
                    totalProducts: { $sum: 1 },
                    averagePrice: { $avg: "$price" },
                    highestQuantity: { $max: "$quantity" }
                }
            }
        ]).toArray();

        return result[0];
    } finally {
        await client.close();
    }
}

async function main() {
    try {
        const statistics = await getProductStatistics();
        console.log(statistics);
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
