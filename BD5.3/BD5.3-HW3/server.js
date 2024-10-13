const express = require("express");
const { sequelize } = require("./lib/index");
const Company = require("./models/company.model");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.json());

const dummyCompanies = [
  {
    id: 1,
    name: "Tech Innovators",
    industry: "Technology",
    foundedYear: 2010,
    headquarters: "San Francisco",
    revenue: 75000000,
  },
  {
    id: 2,
    name: "Green Earth",
    industry: "Renewable Energy",
    foundedYear: 2015,
    headquarters: "Portland",
    revenue: 50000000,
  },
  {
    id: 3,
    name: "Innovatech",
    industry: "Technology",
    foundedYear: 2012,
    headquarters: "Los Angeles",
    revenue: 65000000,
  },
  {
    id: 4,
    name: "Solar Solutions",
    industry: "Renewable Energy",
    foundedYear: 2015,
    headquarters: "Austin",
    revenue: 60000000,
  },
  {
    id: 5,
    name: "HealthFirst",
    industry: "Healthcare",
    foundedYear: 2008,
    headquarters: "New York",
    revenue: 80000000,
  },
  {
    id: 6,
    name: "EcoPower",
    industry: "Renewable Energy",
    foundedYear: 2018,
    headquarters: "Seattle",
    revenue: 55000000,
  },
  {
    id: 7,
    name: "MediCare",
    industry: "Healthcare",
    foundedYear: 2012,
    headquarters: "Boston",
    revenue: 70000000,
  },
  {
    id: 8,
    name: "NextGen Tech",
    industry: "Technology",
    foundedYear: 2018,
    headquarters: "Chicago",
    revenue: 72000000,
  },
  {
    id: 9,
    name: "LifeWell",
    industry: "Healthcare",
    foundedYear: 2010,
    headquarters: "Houston",
    revenue: 75000000,
  },
  {
    id: 10,
    name: "CleanTech",
    industry: "Renewable Energy",
    foundedYear: 2008,
    headquarters: "Denver",
    revenue: 62000000,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await Company.bulkCreate(dummyCompanies);
    res.status(200).send("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).send("Error seeding database");
  }
});

app.get("/companies", async (req, res) => {
  const companies = await Company.findAll();
  res.json({ companies });
});

app.post("/companies/new", async (req, res) => {
  const newCompany = req.body.newCompany;
  if (!newCompany) {
    return res
      .status(400)
      .json({ error: "newCompany is required in the request body" });
  }
  const createdCompany = await Company.create(newCompany);
  res.json({ newCompany: createdCompany });
});

app.post("/companies/update/:id", async (req, res) => {
  const id = req.params.id;
  const newCompanyData = req.body;
  await Company.update(newCompanyData, { where: { id } });
  const updatedCompany = await Company.findByPk(id);
  res.json({ message: "Company updated successfully", updatedCompany });
});

app.post("/companies/delete", async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res
      .status(400)
      .json({ error: "id is required in the request body" });
  }
  await Company.destroy({ where: { id } });
  res.json({ message: "Company record deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
