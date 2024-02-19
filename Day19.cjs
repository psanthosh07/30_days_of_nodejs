const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    validate: {
      validator: function(v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  }
});


const User = mongoose.model('User', userSchema);

async function addUserWithValidation(user) {
  try {

    const newUser = new User(user);

    await newUser.save();
    console.log('User added successfully!');
  } catch (error) {

    if (error.name === 'ValidationError') {
      console.error('Validation Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
  }
}

addUserWithValidation({ username: 'john_doe', email: 'invalid-email' });

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});
