const express = require('express');
const app = express();
const port = 3000;

let users = [
  { id: 1, username: 'ankit', fullName: 'Ankit Kumar', email: 'ankit@gmail.com' },
  { id: 2, username: 'dhananjit', fullName: 'Dhananjit Singh', email: 'dhananjit.singh@gmail.com' },
];

let creditCards = [
  { number: '1234567890123456', holder: 'John Doe', expiry: '12/24' },
  { number: '9876543210987654', holder: 'Jane Smith', expiry: '06/23' }
];

let books = [
  { isbn: '9783161484100', title: 'Example Book', author: 'John Author' },
  { isbn: '9781234567897', title: 'Another Book', author: 'Jane Writer' }
];

let people = [
  { ssn: '123-45-6789', name: 'John Doe', birthDate: '1990-01-01' },
  { ssn: '987-65-4321', name: 'Jane Smith', birthDate: '1985-05-05' }
];

app.get('/username/find/:username', (req, res) => {
  const username = req.params.username;
  const user = users.find(u => u.username === username);
  if (user) {
    res.json({ result: 'Username is not available' });
  } else {
    res.json({ result: 'Username is available' });
  }
});

app.get('/credit-cards/find', (req, res) => {
  const cardNumber = req.query.cardNumber;
  const creditCard = creditCards.find(card => card.number === cardNumber);
  if (creditCard) {
    res.json({ creditCard });
  } else {
    res.status(404).send('Credit card not found');
  }
});

app.get('/emails/find', (req, res) => {
  const email = req.query.email;
  const user = users.find(u => u.email === email);
  if (user) {
    res.json({ user });
  } else {
    res.status(404).send('User not found');
  }
});

app.get('/books/find', (req, res) => {
  const isbn = req.query.isbn;
  const book = books.find(b => b.isbn === isbn);
  if (book) {
    res.json({ book });
  } else {
    res.status(404).send('Book not found');
  }
});

app.get('/ssn/find', (req, res) => {
  const ssn = req.query.ssn;
  const person = people.find(p => p.ssn === ssn);
  if (person) {
    res.json({ person });
  } else {
    res.status(404).send('Person not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});