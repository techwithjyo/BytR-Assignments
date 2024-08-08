let express = require('express');
let cors = require("cors");

let app=express();
app.use(cors());

let person = {
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    age: 30,
    isMember: true
};

app.get('/person/fullname', (req, res) => {
    let fullName = `${person.firstName} ${person.lastName}`;
    res.send(fullName);
});

app.get('/person/firstname-gender', (req, res) => {
    let firstNameAndGender = {
        firstName: person.firstName,
        gender: person.gender
    };
    res.json(firstNameAndGender);
});

app.get('/person', (req, res) => {
    res.json(person);
});

app.get('/person/increment-age', (req, res) => {
    person.age += 1;
    res.json(person);
});

app.get('/person/fullname-membership', (req, res) => {
    let fullNameAndMembership = {
        fullName: `${person.firstName} ${person.lastName}`,
        isMember: person.isMember
    };
    res.json(fullNameAndMembership);
});

app.get('/person/final-price', (req, res) => {
    let cartTotal = parseFloat(req.query.cartTotal);
    let finalPrice = cartTotal;

    if (person.isMember) {
        finalPrice = cartTotal - (cartTotal * 0.10);
    }

    res.send(finalPrice.toString());
});

app.get('/person/shipping-cost', (req, res) => {
    let cartTotal = parseFloat(req.query.cartTotal);
    let shippingCost;

    if (person.isMember) {
        shippingCost = cartTotal >= 500 ? 0 : 99; 
    } else {
        shippingCost = 99;
    }

    res.send(shippingCost.toString());
});

app.listen(3000, () => console.log('Server running on port 3000'));