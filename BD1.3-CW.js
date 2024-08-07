let express = require('express');
let app = express();
let port= 3002;

app.get("/check-number", (req, res)=>{
  let number  = parseFloat(req.query.number) ;

  let result;
  if(number>=0)
  {
    result= 'positive';
  }
  else
  {
    result='negative';
  }
  res.send("Number is "+result);
});

app.get("/check-even-odd", (req, res)=>{
  let number  = parseFloat(req.query.number) ;

  let result;
  if(number%2 ==0)
  {
    result= 'even';
  }
  else
  {
    result='odd';
  }
  res.send("Number is "+result);
});

app.get("/check-login", (req, res) => {
  let isLoggedIn = req.query.isLoggedIn === 'true';

  let result;
  if (isLoggedIn) {
    result = 'User is logged in';
  } else {
    result = 'User is not logged in';
  }
  res.send(result);
});

app.get("/check-discount", (req, res) => {
  let age = parseInt(req.query.age);

  let result;
  if (age > 65) {
    result = 'User is eligible for a discount';
  } else {
    result = 'User is not eligible for a discount';
  }
  res.send(result);
});

app.get("/check-number-type", (req, res) => {
  let number = parseFloat(req.query.number);

  let result;
  if (number > 0) {
    result = 'positive';
  } else if (number < 0) {
    result = 'negative';
  } else {
    result = 'zero';
  }
  res.send("Number is " + result);
});

app.get("/check-temperature", (req, res) => {
  let temperature = parseFloat(req.query.temperature);

  let result;
  if (temperature < 15) {
    result = 'cold';
  } else if (temperature <= 25) {
    result = 'warm';
  } else {
    result = 'hot';
  }
  res.send("Temperature is " + result);
});

app.get("/check-activity-level", (req, res) => {
  let steps = parseInt(req.query.steps);

  let result;
  if (steps < 5000) {
    result = 'low';
  } else if (steps <= 10000) {
    result = 'moderate';
  } else {
    result = 'high';
  }
  res.send("Activity level is " + result);
});

app.get("/check-engagement", (req, res) => {
  let likes = parseInt(req.query.likes);

  let result;
  if (likes < 100) {
    result = 'low';
  } else if (likes <= 500) {
    result = 'medium';
  } else {
    result = 'high';
  }
  res.send("Engagement level is " + result);
});



app.listen(port, ()=>{
  console.log("Server is running on port "+port);
});