const mongoose = require('mongoose');


async function connectToMongoDB() {
    try {

        const mongoURI = 'mongodb://localhost/mydatabase';

   
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log('Connected to MongoDB successfully!');
    } catch (error) {
  
        console.error('Error connecting to MongoDB:', error.message);
    }
}

connectToMongoDB();
