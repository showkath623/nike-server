const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, required: true }
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
module.exports = Order;
