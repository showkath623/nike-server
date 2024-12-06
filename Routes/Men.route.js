// routes/menProducts.js
const express = require('express');
const router = express.Router();
const MenProduct = require('../models/men');

// Get all men products
router.get('/', async (req, res) => {
  try {
    const menProducts = await MenProduct.find();
    res.json(menProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single men product by ID
router.get('/:id', async (req, res) => {
  try {
    const menProduct = await MenProduct.findById(req.params.id);
    if (!menProduct) {
      return res.status(404).json({ message: 'Men Product not found' });
    }
    res.json(menProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new men product
router.post('/', async (req, res) => {
  const { title, usage, price, description, images } = req.body;

  const menProduct = new MenProduct({
    title,
    usage,
    price,
    description,
    images
  });

  try {
    const newMenProduct = await menProduct.save();
    res.status(201).json(newMenProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
