const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: String,
  description: String
});

const productSchema = new Schema({
  name: String,
  price: Number,
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

async function getProductsPopulatedWithCategory() {
  try {
    const products = await Product.find().populate('category').exec();
    return products;
  } catch (error) {
    console.error('Error while populating products with category details:', error);
    return [];
  }
}

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    getProductsPopulatedWithCategory().then(products => {
      console.log('Products with populated category details:', products);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
