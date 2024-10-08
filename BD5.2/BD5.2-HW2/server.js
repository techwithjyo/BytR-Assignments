const express = require('express');
const { sequelize } = require('./lib/index');
const Track = require('./models/employee.model');

const app = express();
const port = 3000;

const dummyEmployeeData = [{
  name: 'Alice',
  salary: 60000,
  department: 'Engineering',
  designation: 'Software Engineer'
},
{
  name: 'Bob',
  salary: 70000,
  department: 'Marketing',
  designation: 'Marketing Manager'
},
{
  name: 'Charlie',
  salary: 80000,
  department: 'Engineering',
  designation: 'Senior Software Engineer'
}
];


app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true }); 
    await Track.bulkCreate(dummyEmployeeData);
    res.status(200).send('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).send('Error seeding database');
  }
});

app.get('/employees', async (req, res) => {
  try {
    const employees = await fetchAllEmployees();
    res.status(200).json({ employees });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).send('Error fetching employees');
  }
});

const fetchAllEmployees = async () => {
  return await Track.findAll();
};

app.get('/employees/details/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await fetchEmployeeById(id);
    res.status(200).json({ employee });
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    res.status(500).send('Error fetching employee by ID');
  }
});

const fetchEmployeeById = async (id) => {
  return await Track.findByPk(id);
};

app.get('/employees/department/:department', async (req, res) => {
  const department = req.params.department;
  try {
    const employees = await fetchEmployeesByDepartment(department);
    res.status(200).json({ employees });
  } catch (error) {
    console.error('Error fetching employees by department:', error);
    res.status(500).send('Error fetching employees by department');
  }
});

const fetchEmployeesByDepartment = async (department) => {
  return await Track.findAll({ where: { department } });
};

app.get('/employees/sort/salary', async (req, res) => {
  const order = req.query.order || 'asc';
  try {
    const employees = await sortEmployeesBySalary(order);
    res.status(200).json({ employees });
  } catch (error) {
    console.error('Error sorting employees by salary:', error);
    res.status(500).send('Error sorting employees by salary');
  }
});

const sortEmployeesBySalary = async (order) => {
  return await Track.findAll({ order: [['salary', order]] });
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

