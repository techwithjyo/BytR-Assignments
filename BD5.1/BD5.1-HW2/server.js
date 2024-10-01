const express = require('express');
const { sequelize } = require('./lib/index');
const Track = require('./models/employee.model');

const app = express();
const port = 3000;

const dummyEmployeeData = [
    {
      name: 'Alice Johnson',
      department: 'Engineering',
      salary: 75000,
      designation: 'Software Engineer',
    },
    {
      name: 'Bob Brown',
      department: 'Marketing',
      salary: 60000,
      designation: 'Marketing Specialist',
    },
    {
      name: 'Charlie Davis',
      department: 'Human Resources',
      salary: 55000,
      designation: 'HR Manager',
    },
    {
      name: 'Diana Evans',
      department: 'Finance',
      salary: 80000,
      designation: 'Financial Analyst',
    },
    {
      name: 'Ethan Foster',
      department: 'Sales',
      salary: 65000,
      designation: 'Sales Executive',
    },
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});