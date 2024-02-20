const { MongoClient } = require('mongodb');

async function averageAgeOfUsers(req, res) {
  try {
    const uri = 'mongodb://localhost:27017';

    const client = new MongoClient(uri);

    await client.connect();

    const database = client.db('test_1');
    const collection = database.collection('s1');

    const aggregationResult = await collection.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: '$age' }
        }
      }
    ]).toArray();

    await client.close();

    const averageAge = aggregationResult[0].averageAge;

    res.json({ averageAge });
  } catch (error) {
    console.error('Error calculating average age:', error);
    res.status(500).json({ error: 'An error occurred while calculating average age' });
  }
}

module.exports = averageAgeOfUsers;
