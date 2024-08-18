const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

app.get('/cart/add', (req, res) => {
  const productId = parseInt(req.query.productId);
  const name = req.query.name;
  const price = parseFloat(req.query.price);
  const quantity = parseInt(req.query.quantity);

  const addItemToCart = (id, name, price, quantity) => {
    cart.push({ productId: id, name: name, price: price, quantity: quantity });
  };

  addItemToCart(productId, name, price, quantity);
  res.json({ cartItems: cart });
});

app.get('/cart/edit', (req, res) => {
  const productId = parseInt(req.query.productId);
  const quantity = parseInt(req.query.quantity);

  const editItemQuantity = (id, quantity) => {
    const item = cart.find(product => product.productId === id);
    if (item) {
      item.quantity = quantity;
    }
  };

  editItemQuantity(productId, quantity);
  res.json({ cartItems: cart });
});

app.get('/cart/delete', (req, res) => {
  const productId = parseInt(req.query.productId);

  const deleteItemFromCart = (id) => {
    cart = cart.filter(product => product.productId !== id);
  };

  deleteItemFromCart(productId);
  res.json({ cartItems: cart });
});

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

app.get('/cart/total-quantity', (req, res) => {
  const calculateTotalQuantity = () => {
    return cart.reduce((total, product) => total + product.quantity, 0);
  };

  const totalQuantity = calculateTotalQuantity();
  res.json({ totalQuantity: totalQuantity });
});

app.get('/cart/total-price', (req, res) => {
  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  const totalPrice = calculateTotalPrice();
  res.json({ totalPrice: totalPrice });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});