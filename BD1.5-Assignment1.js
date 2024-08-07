let express = require('express');
let cors = require("cors");

let app=express();
app.use(cors());

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
    let newItemPrice = parseFloat(req.query.newItemPrice);
    let cartTotal = parseFloat(req.query.cartTotal);
    let totalCartPrice = cartTotal + newItemPrice;
    res.send(totalCartPrice.toString());
});

app.get('/membership-discount', (req, res) => {
    let cartTotal = parseFloat(req.query.cartTotal);
    let isMember = req.query.isMember === 'true';
    let discountPercentage = 10;
    let finalPrice = cartTotal;

    if (isMember) {
        finalPrice = cartTotal - (cartTotal * discountPercentage / 100);
    }

    res.send(finalPrice.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxRate = 5; // Assuming tax rate is 5%
  let taxAmount = cartTotal * taxRate / 100;
  res.send(taxAmount.toString());
});

app.get('/estimate-delivery', (req, res) => {
    let shippingMethod = req.query.shippingMethod;
    let distance = parseFloat(req.query.distance);

    if (!shippingMethod || isNaN(distance)) {
        res.status(400).send('Missing or invalid parameters');
        return;
    }

    let deliveryDays;

    if (shippingMethod === 'standard') {
        deliveryDays = Math.ceil(distance / 50);
    } else if (shippingMethod === 'express') {
        deliveryDays = Math.ceil(distance / 100);
    } else {
        res.status(400).send('Invalid shipping method');
        return;
    }

    res.send(deliveryDays.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2; // Assuming 2 points for every dollar spent
  res.send(loyaltyPoints.toString());
});

app.listen(3000, () => console.log('Server running on port 3000'));