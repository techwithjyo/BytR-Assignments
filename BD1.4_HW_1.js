const express = require('express');
const app = express();
const port = 3000;

// Question 1
app.get('/welcome', (req, res) => {
  const getWelcomeMessage = () => 'We will now learn functions!';
  res.send(getWelcomeMessage());
});

// Question 2
app.get('/greet', (req, res) => {
  const username = req.query.username;
  const getGreetingMessage = (name) => `Hey, ${name}! Are you ready to learn functions with us?`;
  res.send(getGreetingMessage(username));
});

// Question 3
app.get('/message', (req, res) => {
  const yearsOfExp = parseInt(req.query.yearsOfExp, 10);
  const checkYearsOfExp = (years) => years > 0 ? 'You have some experience with functions. Great!' : 'No worries. You will start writing functions in no time!';
  res.send(checkYearsOfExp(yearsOfExp));
});

// Question 4
app.get('/hours', (req, res) => {
  const days = parseInt(req.query.days, 10);
  const hours = parseInt(req.query.hours, 10);
  const getTime = (days, hours) => days * hours;
  res.send(getTime(days, hours).toString());
});

// Question 5
app.get('/module-completion-status', (req, res) => {
  const username = req.query.username;
  const hasCompleted = req.query.hasCompleted === 'true';
  const getModuleCompletion = (name, completed) => `${name} has ${completed ? 'completed' : 'not completed'} the modules`;
  res.send(getModuleCompletion(username, hasCompleted));
});

// Question 6
app.get('/personalized-greeting', (req, res) => {
  const city = req.query.city;
  const name = req.query.name;
  const getPersonalizedGreeting = (name, city) => `Hey, ${name}! What's famous about ${city}?`;
  res.send(getPersonalizedGreeting(name, city));
});

// Question 7
app.get('/find-age', (req, res) => {
  const birthyear = parseInt(req.query.birthyear, 10);
  const findAge = (birthyear) => 2024 - birthyear;
  res.send(findAge(birthyear).toString());
});

// Question 8
app.get('/is-time-sufficient', (req, res) => {
  const days = parseInt(req.query.days, 10);
  const hours = parseInt(req.query.hours, 10);
  const findRequiredTime = (days, hours) => days * hours >= 30 ? 'The time being dedicated is sufficient for learning functions' : 'The time being dedicated is not sufficient for learning functions';
  res.send(findRequiredTime(days, hours));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});