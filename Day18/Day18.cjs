const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();

function getAllUsers(req, res) {
  User.find({}, (err, users) => {
    if (err) {
      console.error('Error retrieving users:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(users);
    }
  });
}

app.get('/users', getAllUsers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
