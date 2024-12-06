const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Ensure correct path
const mongoose = require('mongoose');

// Add product to cart
router.post('/', async (req, res) => {
  try {
    const { product } = req.body;

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(product._id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    // Remove currency symbol and commas from the price
    const price = parseFloat(product.price.replace(/[₹,]/g, ''));

    let cart = await Cart.findOne();

    if (cart) {
      // Check if the item is already in the cart
      const itemIndex = cart.items.findIndex(item => item._id.equals(new mongoose.Types.ObjectId(product._id)));

      if (itemIndex > -1) {
        // Update quantity if item exists
        cart.items[itemIndex].quantity += 1;
      } else {
        // Add new item if it doesn't exist
        cart.items.push({ ...product, _id: new mongoose.Types.ObjectId(product._id), price, quantity: 1 });
      }
    } else {
      // Create a new cart if none exists
      cart = new Cart({
        items: [{ ...product, _id: new mongoose.Types.ObjectId(product._id), price, quantity: 1 }]
      });
    }

    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Error adding product to cart', error: error.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { productId } = req.body;

    console.log('Received productId for deletion:', productId); // Log received productId

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Check if the product exists in the cart
    const productExists = cart.items.some(item => item._id.equals(new mongoose.Types.ObjectId(productId)));
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Remove the product from the cart
    cart.items = cart.items.filter(item => !item._id.equals(new mongoose.Types.ObjectId(productId)));

    const updatedCart = await cart.save();
    console.log('Updated cart after deletion:', updatedCart); // Log updated cart

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error('Error removing product from cart:', error);
    res.status(500).json({ message: 'Error removing product from cart', error: error.message });
  }
});



//getting the carts
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); 


//updating the quantity

router.put('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate product ID and quantity
    if (!mongoose.Types.ObjectId.isValid(productId) || quantity < 1) {
      return res.status(400).json({ message: 'Invalid product ID or quantity' });
    }

    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item in the cart
    const cartItem = cart.items.find(item => item._id.equals(new mongoose.Types.ObjectId(productId)));

    if (cartItem) {
      // Update the quantity
      cartItem.quantity = quantity;
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
  } catch (error) {
    console.error('Error updating quantity in cart:', error);
    res.status(500).json({ message: 'Error updating quantity in cart', error: error.message });
  }
});


module.exports = router;
