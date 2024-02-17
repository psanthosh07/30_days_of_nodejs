const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String
});

const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

/**
 * Adds a new user to the MongoDB database
 * @param {Object} user - User object with properties username and email
 */
async function addUserToDatabase(user) {
  try {

    const newUser = new User(user);

    await newUser.save();

    console.log('User added successfully.');
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

addUserToDatabase({ username: 'Ash', email: 'Ash123@gmail.com' });
