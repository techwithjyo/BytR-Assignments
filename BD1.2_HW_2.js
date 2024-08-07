let express = require("express");
let app = express();
let port = 3002;

app.get("/bmi", (req, res) => {
  let height = req.query.height;
  let weight = req.query.weight;

  let bmi = parseFloat(weight) / (parseFloat(height) * parseFloat(height));
  res.send("Your BMI is " + bmi.toString());
});

app.get("/checkout", (req, res) => {
  let product = req.query.product;
  let units = req.query.units;
  let price = req.query.price;

  let total = parseFloat(units) * parseFloat(price);
  res.send(
    "Your total for " + units + " " + product + " is " + total.toString(),
  );
});

app.get("/grade", (req, res) => {
  let maths = parseInt(req.query.maths);
  let science = parseInt(req.query.science);
  let english = parseInt(req.query.english);

  let gradeInPercentage = ((maths + science + english) / 300) * 100;
  res.send("Your grade in percentage is " + gradeInPercentage + "%");
});

app.get("/discounted-price", (req, res) => {
  let cartTotal = req.query.cartTotal;
  let discount = req.query.discount;

  let price =
    parseFloat(cartTotal) -
    parseFloat(cartTotal) * (parseFloat(discount) / 100);
  res.send("Result: Your bill amount is " + price);
});

app.get("/split-bill", (req, res) => {
  let billAmount = req.query.billAmount;
  let numberOfFriends = req.query.numberOfFriends;

  let splitAmount = parseFloat(billAmount) / parseFloat(numberOfFriends);
  res.send(
    "Result: Each friend owes Rs. " + splitAmount + " against the bill.",
  );
});

app.get("/celsius-to-fahrenheit", (req, res) => {
  let celsius = req.query.temperature;
  let fahrenheit = (celsius * 9) / 5 + 32;

  res.send("Result: " + fahrenheit + " fahrenheit");
});

app.get("/monthly-salary", (req, res) => {
  let totalHours = req.query.totalHours;
  let hourlyWage = req.query.hourlyWage;

  let monthlySalary = parseFloat(totalHours) * parseFloat(hourlyWage);
  res.send("Result: Your monthly salary is Rs. " + monthlySalary);
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
