const express = require('express');
const app = express();
const port = 3000;

let phones = [
  { number: '123-456-7890', owner: 'Alice', type: 'mobile' },
  { number: '987-654-3210', owner: 'Bob', type: 'home' }
];

let accounts = [
  { number: '111122223333', holder: 'Charlie', balance: 5000 },
  { number: '444455556666', holder: 'Dave', balance: 3000 }
];

let licenses = [
  { number: 'D1234567', name: 'Eve', expiryDate: '2026-04-01' },
  { number: 'D7654321', name: 'Frank', expiryDate: '2024-11-15' }
];

let employees = [
  { id: 'E1234', name: 'Grace', department: 'Engineering' },
  { id: 'E5678', name: 'Hank', department: 'Marketing' }
];

let orders = [
  { id: 'ORD12345', customerName: 'Ivy', totalAmount: 150 },
  { id: 'ORD67890', customerName: 'Jake', totalAmount: 200 }
];

app.get('/phones/find', (req, res) => {
  const phoneNumber = req.query.phoneNumber;
  const phone = phones.find(p => p.number === phoneNumber);
  if (phone) {
    res.json({ phone });
  } else {
    res.status(404).send('Phone number not found');
  }
});

app.get('/accounts/find', (req, res) => {
  const accountNumber = req.query.accountNumber;
  const account = accounts.find(a => a.number === accountNumber);
  if (account) {
    res.json({ account });
  } else {
    res.status(404).send('Account not found');
  }
});

app.get('/licenses/find', (req, res) => {
  const licenseNumber = req.query.licenseNumber;
  const license = licenses.find(l => l.number === licenseNumber);
  if (license) {
    res.json({ license });
  } else {
    res.status(404).send('License not found');
  }
});

app.get('/employees/find', (req, res) => {
  const employeeId = req.query.employeeId;
  const employee = employees.find(e => e.id === employeeId);
  if (employee) {
    res.json({ employee });
  } else {
    res.status(404).send('Employee not found');
  }
});

app.get('/orders/find', (req, res) => {
  const orderId = req.query.orderId;
  const order = orders.find(o => o.id === orderId);
  if (order) {
    res.json({ order });
  } else {
    res.status(404).send('Order not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});