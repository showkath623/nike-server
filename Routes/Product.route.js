const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products); // Send response once
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product); // Send response once
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const { title, usage, price, description, images } = req.body;

  // Create a new product instance
  const product = new Product({
    title,
    usage,
    price,
    description,
    images
  });

  try {
    // Save the product to the database
    const newProduct = await product.save();
    res.status(201).json(newProduct); // Send response once
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
