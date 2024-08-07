const express = require('express');
const app = express();
const port = 3000;

// Question 1
app.get('/welcome', (req, res) => {
  const getWelcomeMessage = () => 'Welcome to our service!';
  res.send(getWelcomeMessage());
});

// Question 2
app.get('/greet', (req, res) => {
  const username = req.query.username;
  const getGreetingMessage = (name) => `Hello, ${name}!`;
  res.send(getGreetingMessage(username));
});

// Question 3
app.get('/check-password', (req, res) => {
  const password = req.query.password;
  const checkPasswordStrength = (pwd) => pwd.length > 15 ? 'Password is strong' : 'Password is weak';
  res.send(checkPasswordStrength(password));
});

// Question 4
app.get('/sum', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  const getSum = (a, b) => a + b;
  res.send(getSum(num1, num2).toString());
});

// Question 5
app.get('/subscription-status', (req, res) => {
  const username = req.query.username;
  const isSubscribed = req.query.isSubscribed === 'true';
  const getSubscriptionStatus = (name, subscribed) => `${name} is ${subscribed ? 'subscribed' : 'not subscribed'}`;
  res.send(getSubscriptionStatus(username, isSubscribed));
});

// Question 6
app.get('/discounted-price', (req, res) => {
  const price = parseFloat(req.query.price);
  const discount = parseFloat(req.query.discount);
  const getDiscountedPrice = (price, discount) => price - (price * discount / 100);
  res.send(getDiscountedPrice(price, discount).toString());
});

// Question 7
app.get('/personalized-greeting', (req, res) => {
  const age = parseInt(req.query.age, 10);
  const gender = req.query.gender;
  const name = req.query.name;
  const getPersonalizedGreeting = (name, age, gender) => `Hello, ${name}! You are a ${age} year old ${gender}.`;
  res.send(getPersonalizedGreeting(name, age, gender));
});

// Question 8
app.get('/final-price', (req, res) => {
  const price = parseFloat(req.query.price);
  const discount = parseFloat(req.query.discount);
  const tax = parseFloat(req.query.tax);
  const getFinalPrice = (price, discount, tax) => {
    const discountedPrice = price - (price * discount / 100);
    return discountedPrice + (discountedPrice * tax / 100);
  };
  res.send(getFinalPrice(price, discount, tax).toString());
});

// Question 9
app.get('/total-exercise-time', (req, res) => {
  const running = parseInt(req.query.running, 10);
  const cycling = parseInt(req.query.cycling, 10);
  const swimming = parseInt(req.query.swimming, 10);
  const getTotalExerciseTime = (running, cycling, swimming) => running + cycling + swimming;
  res.send(getTotalExerciseTime(running, cycling, swimming).toString());
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});