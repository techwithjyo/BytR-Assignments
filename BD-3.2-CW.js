const express = require('express');
const app = express();
const port = 3000;

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let names = ['Rahul', 'Sita', 'Amit', 'Vikram', 'Priya'];
let employees = [
  { employeeId: 1, name: 'Rahul' },
  { employeeId: 2, name: 'Sita' },
  { employeeId: 3, name: 'Amit' }
];

let contacts = [
  { phoneNumber: '1234567890', name: 'Rahul', address: '123 Street, City' },
  { phoneNumber: '0987654321', name: 'Sita', address: '456 Avenue, City' },
  { phoneNumber: '1112223334', name: 'Amit', address: '789 Boulevard, City' }
];

app.get('/numbers/find/:number', (req, res) => {
  const number = parseInt(req.params.number);
  let numberFound = numbers.find(num => num === number);
  if (numberFound !== undefined) {
    res.send(numberFound.toString());
  } else {
    res.status(404).send('Number not found');
  }
});

app.get('/names/find/:name', (req, res) => {
  const name = req.params.name;
  const foundName = names.find(n => n === name);
  if (foundName) {
    res.send(foundName);
  } else {
    res.status(404).send('Name not found');
  }
});

app.get('/employees/find/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const foundEmployee = employees.find(emp => emp.employeeId === id);
  if (foundEmployee) {
    res.json(foundEmployee);
  } else {
    res.status(404).send('Employee not found');
  }
});

app.get('/contacts/find/:phoneNumber', (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  const foundContact = contacts.find(contact => contact.phoneNumber === phoneNumber);
  if (foundContact) {
    res.json(foundContact);
  } else {
    res.status(404).send('Contact not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});