let express = require('express');
let app = express();
let port= 3002;

app.get('/check-bmi', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const height = parseFloat(req.query.height);

  const bmi = weight / (height * height);
  let category;

  if (bmi < 18.5) {
    category = 'underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = 'normal weight';
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'overweight';
  } else {
    category = 'obese';
  }

  res.send(`BMI category is ${category}`);
});

app.get('/check-performance', (req, res) => {
  const grade = parseFloat(req.query.grade);
  let performance;

  if (grade >= 90) {
    performance = 'excellent';
  } else if (grade >= 75) {
    performance = 'good';
  } else if (grade >= 50) {
    performance = 'average';
  } else {
    performance = 'poor';
  }

  res.send(`Academic performance is ${performance}`);
});

app.get('/check-age-group', (req, res) => {
  const age = parseInt(req.query.age, 10);
  let ageGroup;

  if (age <= 12) {
    ageGroup = 'child';
  } else if (age <= 17) {
    ageGroup = 'teenager';
  } else if (age <= 64) {
    ageGroup = 'adult';
  } else {
    ageGroup = 'senior';
  }

  res.send(`Age group is ${ageGroup}`);
});


app.get('/check-loan-eligibility', (req, res) => {
  const creditScore = parseInt(req.query.creditScore, 10);
  let eligibility;

  if (creditScore >= 750) {
    eligibility = 'high';
  } else if (creditScore >= 650) {
    eligibility = 'medium';
  } else {
    eligibility = 'low';
  }

  res.send(`Loan eligibility is ${eligibility}`);
});

app.get('/check-tax-bracket', (req, res) => {
  const income = parseFloat(req.query.income);
  let taxBracket;

  if (income <= 500000) {
    taxBracket = '10% tax bracket';
  } else if (income <= 1000000) {
    taxBracket = '15% tax bracket';
  } else if (income <= 1500000) {
    taxBracket = '20% tax bracket';
  } else {
    taxBracket = '30% tax bracket';
  }

  res.send(`You fall under the ${taxBracket}`);
});



app.listen(port, ()=>{
  console.log("Server is running on port "+port);
});