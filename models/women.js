const mongoose = require('mongoose');

const womenProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  usage: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }]
});

module.exports = mongoose.model('WomenProduct', womenProductSchema);



