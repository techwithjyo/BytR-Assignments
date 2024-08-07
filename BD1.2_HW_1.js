let express = require('express');
let app = express();
let port= 3002;

app.get("/total-marks", (req, res)=>{
  let marks1 = req.query.marks1;
  let marks2  = req.query.marks2;

  let totalMarks = parseFloat(marks1) + parseFloat(marks2);
  res.send(totalMarks.toString());
});

app.get("/total-weight", (req,res)=>{
  let weight1 = req.query.weight1;
  let weight2 = req.query.weight2;
  let weight3  = req.query.weight3;

  let totalWeight = parseFloat(weight1) + parseFloat(weight2) + parseFloat(weight3);
  res.send(totalWeight.toString());
});

app.get("/monthly-salary", (req, res)=>{
  let annualSalary  = req.query.annualSalary;

  let monthlySalary = parseFloat(annualSalary) /12;
  res.send(monthlySalary.toString());
});

app.get("/total-pages", (req, res)=>{
  let pagesPerDay  = req.query.pagesPerDay;
  let days   = req.query.days 
  let totalPages = parseFloat(pagesPerDay) * parseFloat(days);
  res.send(totalPages.toString());
});

app.get("/currency-conversion", (req, res)=>{
  let amount  = req.query.amount;
  let exchangeRate  = req.query.exchangeRate;
  
  let convertedAmount = amount * exchangeRate;
  res.send(convertedAmount.toString());
});

app.get("/average-sales", (req,res)=>{
  let sales1 = req.query.sales1;
  let sales2 = req.query.sales2;
  let sales3 = req.query.sales3;

  let avgSales = (parseFloat(sales1) + parseFloat(sales2) + parseFloat(sales3)) / 3;
  res.send(avgSales.toString());
});

app.listen(port, ()=>{
  console.log("Server is running on port "+port);
});