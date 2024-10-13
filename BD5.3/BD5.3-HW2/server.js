const express = require("express");
const { sequelize } = require("./lib/index");
const Employee = require("./models/employee.model");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.json());

const dummyEmployees = [
  {
    id: 1,
    name: "John Doe",
    designation: "Manager",
    department: "Sales",
    salary: 90000,
  },
  {
    id: 2,
    name: "Anna Brown",
    designation: "Developer",
    department: "Engineering",
    salary: 80000,
  },
  {
    id: 3,
    name: "James Smith",
    designation: "Designer",
    department: "Marketing",
    salary: 70000,
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "HR Specialist",
    department: "Human Resources",
    salary: 60000,
  },
  {
    id: 5,
    name: "Michael Wilson",
    designation: "Developer",
    department: "Engineering",
    salary: 85000,
  },
  {
    id: 6,
    name: "Sarah Johnson",
    designation: "Data Analyst",
    department: "Data Science",
    salary: 75000,
  },
  {
    id: 7,
    name: "David Lee",
    designation: "QA Engineer",
    department: "Quality Assurance",
    salary: 70000,
  },
  {
    id: 8,
    name: "Linda Martinez",
    designation: "Office Manager",
    department: "Administration",
    salary: 50000,
  },
  {
    id: 9,
    name: "Robert Hernandez",
    designation: "Product Manager",
    department: "Product",
    salary: 95000,
  },
  {
    id: 10,
    name: "Karen Clark",
    designation: "Sales Associate",
    department: "Sales",
    salary: 55000,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await Employee.bulkCreate(dummyEmployees);
    res.status(200).send("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).send("Error seeding database");
  }
});

app.get("/employees", async (req, res) => {
  const employees = await Employee.findAll();
  res.json({ employees });
});

app.post("/employees/new", async (req, res) => {
  const newEmployee = req.body.newEmployee;
  if (!newEmployee) {
    return res
      .status(400)
      .json({ error: "newEmployee is required in the request body" });
  }
  const createdEmployee = await Employee.create(newEmployee);
  res.json({ newEmployee: createdEmployee });
});

app.post("/employees/update/:id", async (req, res) => {
  const id = req.params.id;
  const newEmployeeData = req.body;
  await Employee.update(newEmployeeData, { where: { id } });
  const updatedEmployee = await Employee.findByPk(id);
  res.json({ message: "Employee updated successfully", updatedEmployee });
});

app.post("/employees/delete", async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res
      .status(400)
      .json({ error: "id is required in the request body" });
  }
  await Employee.destroy({ where: { id } });
  res.json({ message: "Employee record deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
