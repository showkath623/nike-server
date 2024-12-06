const express = require('express');
const router = express.Router();
const MenShoe = require('../models/menshoe');

// Get all men's shoes
router.get('/', async (req, res) => {
  try {
    const menShoes = await MenShoe.find();
    res.json(menShoes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single men's shoe by ID
router.get('/:id', async (req, res) => {
  try {
    const menShoe = await MenShoe.findById(req.params.id);
    if (!menShoe) {
      return res.status(404).json({ message: 'Men Shoe not found' });
    }
    res.json(menShoe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new men's shoe
router.post('/', async (req, res) => {
  const { title, usage, price, description, images } = req.body;

  const menShoe = new MenShoe({
    title,
    usage,
    price,
    description,
    images
  });

  try {
    const newMenShoe = await menShoe.save();
    res.status(201).json(newMenShoe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
