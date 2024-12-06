const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, './images')));

mongoose.connect('mongodb://localhost:27017/nike')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Import routes
const productRoutes = require('./Routes/Product.route');
const orderRoutes = require('./Routes/Order.route');
const CartRoute=require('./Routes/Cart.route')
const MenRoute=require('./Routes/Men.route');
const Menshoe=require('./Routes/Menshoe.route')
const RegisterRoute=require('./Routes/Register.route')
const WomenRoute=require('./Routes/Women.route')

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/carts',CartRoute);
app.use('/api/men',MenRoute);
app.use('/api/menshoe',Menshoe)
app.use('/api/register',RegisterRoute)
app.use('/api/women',WomenRoute)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
