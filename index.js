let express = require('express');
let app = express();
let port= 3000;

app.get("/whisper", (req, res)=>{
  let myName = req.query.name.toLowerCase();
  console.log(myName);
  res.send(myName);
});

app.get("/fullProductname", (req, res)=>{
  let companyName  = req.query.companyName;
  let productName = req.query.productName;
  let fullProductName= companyName + " " + productName;
  res.send(fullProductName);
});

app.get("/date", (req, res)=>{
  let month  = req.query.month;
  let year = req.query.year;
  let formattedDate= month + "/" + year;
  res.send(formattedDate);
});

app.get("/greet", (req, res)=>{
  let city  = req.query.city;
  let greetings= "You live in "+ city;
  res.send(greetings);
});

app.get("/capital", (req, res)=>{
  let capital  = req.query.capital;
  let country  = req.query.country;
  let countryCapital= capital + " is the capital of " + country+ ".";
  res.send(countryCapital);
});

app.get("/officeEmail", (req, res)=>{
  let firstName  = req.query.firstName;
  let lastName  = req.query.lastName;
  let domain   = req.query.domain ;
  let email= firstName+"."+lastName+"@"+domain;
  res.send(email);
});

app.listen(port, ()=>{
  console.log("Server is running on port "+port);
});