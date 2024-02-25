const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, index: true },
});

const Product = mongoose.model('Product', productSchema);

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

