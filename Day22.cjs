const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

const Product = mongoose.model('Product', productSchema);

async function createProduct(product) {
  try {
    const newProduct = await Product.create(product);
    console.log('Product created successfully:', newProduct);
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

async function getAllProducts() {
  try {
    const products = await Product.find();
    console.log('All products retrieved successfully:', products);
    return products;
  } catch (error) {
    console.error('Error retrieving products:', error);
    throw error;
  }
}

async function updateProduct(productId, updatedProduct) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    console.log('Product updated successfully:', product);
    return product;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

async function deleteProduct(productId) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    console.log('Product deleted successfully:', deletedProduct);
    return deletedProduct;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

mongoose.connect('mongodb://localhost:27017/my_database', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    createProduct({ name: 'Product 1', price: 10, quantity: 5 })
      .then(() => getAllProducts())
      .then(products => {
        if (products.length > 0) {
          const productId = products[0]._id;
          return updateProduct(productId, { price: 15, quantity: 7 })
            .then(() => deleteProduct(productId));
        }
      })
      .catch(error => console.error('Error:', error))
      .finally(() => mongoose.connection.close());
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));
