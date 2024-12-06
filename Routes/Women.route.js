// routes/menProducts.js
const express = require('express');
const router = express.Router();
const WomenProduct = require('../models/women');

// Get all men products
router.get('/', async (req, res) => {
  try {
    const womenProducts = await WomenProduct.find();
    res.json(womenProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single men product by ID
router.get('/:id', async (req, res) => {
  try {
    const womenProduct = await WomenProduct.findById(req.params.id);
    if (!womenProduct) {
      return res.status(404).json({ message: 'Men Product not found' });
    }
    res.json(womenProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new women product
router.post('/', async (req, res) => {
  const { title, usage, price, description, images } = req.body;

  const womenProduct = new WomenProduct({
    title,
    usage,
    price,
    description,
    images
  });

  try {
    const newWomenProduct = await womenProduct.save();
    res.status(201).json(newWomenProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
