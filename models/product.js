const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  usage: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  images: [String]
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
module.exports = Product;