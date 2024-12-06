const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  items: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, default: 0 }
    }
  ]
});

module.exports = mongoose.model('Cart', CartSchema);
