const express = require('express');
const app = express();
const port = 3000;

// Question 1
app.get('/github-profile', (req, res) => {
  const username = req.query.username;
  const generateProfileUrl = (username) => `https://github.com/${username}`;
  res.send(generateProfileUrl(username));
});

// Question 2
app.get('/certificate', (req, res) => {
  const { firstName, lastName, courseName } = req.query;
  const generateCertificate = (firstName, lastName, courseName) => 
    `This certification is awarded to ${firstName} ${lastName} for completing the course ${courseName.toUpperCase()}`;
  res.send(generateCertificate(firstName, lastName, courseName));
});

// Question 3
app.get('/grade', (req, res) => {
  const { maths, science, english } = req.query;
  const calculateGrade = (maths, science, english) => {
    const totalMarks = parseInt(maths, 10) + parseInt(science, 10) + parseInt(english, 10);
    const gradeInPercentage = Math.round((totalMarks / 300) * 100);
    return `Your grade in percentage is ${gradeInPercentage}%`;
  };
  res.send(calculateGrade(maths, science, english));
});

// Question 4
app.get('/split-bill', (req, res) => {
  const { billAmount, numberOfFriends } = req.query;
  const splitBill = (billAmount, numberOfFriends) => {
    const splitAmount = (parseFloat(billAmount) / parseInt(numberOfFriends, 10)).toFixed(2);
    return `Result: Each friend owes Rs. ${splitAmount} against the bill`;
  };
  res.send(splitBill(billAmount, numberOfFriends));
});

// Question 5
app.get('/monthly-salary', (req, res) => {
  const { totalHours, hourlyWage } = req.query;
  const calculateSalary = (totalHours, hourlyWage) => {
    const monthlySalary = parseFloat(hourlyWage) * parseInt(totalHours, 10);
    return `Result: Your monthly salary is ₹${monthlySalary}`;
  };
  res.send(calculateSalary(totalHours, hourlyWage));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});