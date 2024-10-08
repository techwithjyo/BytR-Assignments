const express = require('express');
const { sequelize } = require('../BD5.2-HW3/lib/index');
const Track = require('./models/company.model');

const app = express();
const port = 3000;

const dummyCompanyData = [
  {
    name: 'Tech Innovators',
    industry: 'Technology',
    foundedYear: 2010,
    headquarters: 'San Francisco',
    revenue: 75000000
  },
  {
    name: 'Green Earth',
    industry: 'Renewable Energy',
    foundedYear: 2015,
    headquarters: 'Portland',
    revenue: 50000000
  },
  {
    name: 'Innovatech',
    industry: 'Technology',
    foundedYear: 2012,
    headquarters: 'Los Angeles',
    revenue: 65000000
  },
  {
    name: 'Solar Solutions',
    industry: 'Renewable Energy',
    foundedYear: 2015,
    headquarters: 'Austin',
    revenue: 60000000
  },
  {
    name: 'HealthFirst',
    industry: 'Healthcare',
    foundedYear: 2008,
    headquarters: 'New York',
    revenue: 80000000
  },
  {
    name: 'EcoPower',
    industry: 'Renewable Energy',
    foundedYear: 2018,
    headquarters: 'Seattle',
    revenue: 55000000
  },
  {
    name: 'MediCare',
    industry: 'Healthcare',
    foundedYear: 2012,
    headquarters: 'Boston',
    revenue: 70000000
  },
  {
    name: 'NextGen Tech',
    industry: 'Technology',
    foundedYear: 2018,
    headquarters: 'Chicago',
    revenue: 72000000
  },
  {
    name: 'LifeWell',
    industry: 'Healthcare',
    foundedYear: 2010,
    headquarters: 'Houston',
    revenue: 75000000
  },
  {
    name: 'CleanTech',
    industry: 'Renewable Energy',
    foundedYear: 2008,
    headquarters: 'Denver',
    revenue: 62000000
  }
];


app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true }); 
    await Track.bulkCreate(dummyCompanyData);
    res.status(200).send('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).send('Error seeding database');
  }
});

app.get('/companies', async (req, res) => {
  try {
    const companies = await fetchAllCompanies();
    res.status(200).json({ companies });
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).send('Error fetching companies');
  }
});

const fetchAllCompanies = async () => {
  return await Track.findAll();
};

app.get('/companies/details/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const company = await fetchCompanyById(id);
    res.status(200).json({ company });
  } catch (error) {
    console.error('Error fetching company by ID:', error);
    res.status(500).send('Error fetching company by ID');
  }
});

const fetchCompanyById = async (id) => {
  return await Track.findByPk(id);
};

app.get('/companies/industry/:industry', async (req, res) => {
  const industry = req.params.industry;
  try {
    const companies = await fetchCompaniesByIndustry(industry);
    res.status(200).json({ companies });
  } catch (error) {
    console.error('Error fetching companies by industry:', error);
    res.status(500).send('Error fetching companies by industry');
  }
});

const fetchCompaniesByIndustry = async (industry) => {
  return await Track.findAll({ where: { industry } });
};

app.get('/companies/revenue', async (req, res) => {
  const order = req.query.order || 'asc';
  try {
    const companies = await sortCompaniesByRevenue(order);
    res.status(200).json({ companies });
  } catch (error) {
    console.error('Error sorting companies by revenue:', error);
    res.status(500).send('Error sorting companies by revenue');
  }
});

const sortCompaniesByRevenue = async (order) => {
  return await Track.findAll({ order: [['revenue', order]] });
};

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});