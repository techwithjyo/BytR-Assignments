let express = require('express');
let app = express();
let port= 3002;

app.get("/check-whole-number", (req, res) => {
  let number = parseFloat(req.query.number);

  let result;
  if (Number.isInteger(number)) {
    result = 'whole';
  } else {
    result = 'not whole';
  }
  res.send("Number is " + result + " number");
});

app.get("/check-equal", (req, res) => {
  let num1 = parseFloat(req.query.num1);
  let num2 = parseFloat(req.query.num2);

  let result;
  if (num1 === num2) {
    result = 'equal';
  } else {
    result = 'not equal';
  }
  res.send("Numbers are " + result);
});

app.get("/check-active", (req, res) => {
  let isActive = req.query.isActive === 'true';

  let result;
  if (isActive) {
    result = 'User is Active';
  } else {
    result = 'User is not Active';
  }
  res.send(result);
});

app.get("/check-discount", (req, res) => {
  let cost = parseFloat(req.query.cost);

  let result;
  if (cost > 1000) {
    result = 'User is eligible for a discount';
  } else {
    result = 'User is not eligible for a discount';
  }
  res.send(result);
});

app.get('/check-experience', (req, res) => {
  const workExperience = parseInt(req.query.workExperience, 10);
  let result;

  if (workExperience > 0) {
    result = 'experienced';
  } else if (workExperience < 0) {
    result = 'non-working';
  } else {
    result = 'fresher';
  }

  res.send(`Person is ${result}`);
});

app.get('/check-result', (req, res) => {
  const result = parseFloat(req.query.result);
  let grade;

  if (result > 80) {
    grade = 'A';
  } else if (result >= 50 && result <= 80) {
    grade = 'B';
  } else {
    grade = 'Fail';
  }

  res.send(`The grade is ${grade}`);
});

app.get('/check-attendance', (req, res) => {
  const attendance = parseInt(req.query.attendance, 10);
  let result;

  if (attendance < 50) {
    result = 'low';
  } else if (attendance < 90) {
    result = 'moderate';
  } else {
    result = 'high';
  }

  res.send(`Attendance is ${result}`);
});

app.get('/check-rating', (req, res) => {
  const stars = parseFloat(req.query.stars);
  let result;

  if (stars < 3) {
    result = 'low';
  } else if (stars <= 4) {
    result = 'medium';
  } else {
    result = 'high';
  }

  res.send(`Restaurant rating is ${result}`);
});


app.listen(port, ()=>{
  console.log("Server is running on port "+port);
});