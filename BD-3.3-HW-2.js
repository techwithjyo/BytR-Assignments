const express = require('express');
const app = express();
const port = 3000;

let products = [
  { productId: 1, name: 'Laptop', inStock: true },
  { productId: 2, name: 'Phone', inStock: true },
  { productId: 3, name: 'Tablet', inStock: false }
];

let employees = [
  { employeeId: 1, name: 'Alice', active: true },
  { employeeId: 2, name: 'Bob', active: true },
  { employeeId: 3, name: 'Charlie', active: false }
];

let orders = [
  { orderId: 1, product: 'Laptop', delivered: false },
  { orderId: 2, product: 'Phone', delivered: true },
  { orderId: 3, product: 'Tablet', delivered: false }
];

let reservations = [
  { reservationId: 1, name: 'John', confirmed: false },
  { reservationId: 2, name: 'Jane', confirmed: true },
  { reservationId: 3, name: 'Jack', confirmed: false }
];

let subscriptions = [
  { subscriptionId: 1, service: 'Netflix', active: false },
  { subscriptionId: 2, service: 'Spotify', active: true },
  { subscriptionId: 3, service: 'Amazon Prime', active: false }
];

app.get('/products/remove-out-of-stock', (req, res) => {
  const removeOutOfStockProducts = () => {
    return products.filter(product => product.inStock);
  };

  const result = removeOutOfStockProducts();
  res.json(result);
});

app.get('/employees/update', (req, res) => {
  const employeeId = parseInt(req.query.employeeId);
  const active = req.query.active === 'true';

  const updateEmployeeStatusById = (id, status) => {
    const employee = employees.find(e => e.employeeId === id);
    if (employee) {
      employee.active = status;
    }
  };

  updateEmployeeStatusById(employeeId, active);
  res.json(employees);
});

app.get('/orders/update', (req, res) => {
  const orderId = parseInt(req.query.orderId);
  const delivered = req.query.delivered === 'true';

  const updateOrderStatusById = (id, status) => {
    const order = orders.find(o => o.orderId === id);
    if (order) {
      order.delivered = status;
    }
  };

  updateOrderStatusById(orderId, delivered);
  res.json(orders);
});

app.get('/reservations/remove-unconfirmed', (req, res) => {
  const removeUnconfirmedReservations = () => {
    return reservations.filter(reservation => reservation.confirmed);
  };

  const result = removeUnconfirmedReservations();
  res.json(result);
});

app.get('/subscriptions/update', (req, res) => {
  const subscriptionId = parseInt(req.query.subscriptionId);
  const active = req.query.active === 'true';

  const updateSubscriptionStatusById = (id, status) => {
    const subscription = subscriptions.find(s => s.subscriptionId === id);
    if (subscription) {
      subscription.active = status;
    }
  };

  updateSubscriptionStatusById(subscriptionId, active);
  res.json(subscriptions);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});