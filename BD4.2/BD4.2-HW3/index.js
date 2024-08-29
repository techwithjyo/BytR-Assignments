const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3001;
let db;

(async () => {
  db = await open({
    filename: "BD4.2/BD4.2-HW3/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 HW3 Template" });
});

const fetchAllCompanies = async () => {
  return await db.all('SELECT * FROM companies');
};

const fetchCompaniesByIndustry = async (industry) => {
  return await db.all('SELECT * FROM companies WHERE industry = ?', [industry]);
};

const fetchCompaniesByRevenue = async (minRevenue, maxRevenue) => {
  return await db.all('SELECT * FROM companies WHERE revenue BETWEEN ? AND ?', [minRevenue, maxRevenue]);
};

const fetchCompaniesByEmployeesCount = async (employeesCount) => {
  return await db.all('SELECT * FROM companies WHERE employee_count < ?', [employeesCount]);
};

const fetchCompaniesByFoundedYear = async (foundedYear) => {
  return await db.all('SELECT * FROM companies WHERE founded_year = ?', [foundedYear]);
};

app.get('/companies', async (req, res) => {
  try {
    const companies = await fetchAllCompanies();
    if (companies.length === 0) {
      res.status(404).json({ error: 'No companies found' });
    } else {
      res.status(200).json({ companies });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/companies/industry/:industry', async (req, res) => {
  const industry = req.params.industry;
  try {
    const companies = await fetchCompaniesByIndustry(industry);
    if (companies.length === 0) {
      res.status(404).json({ error: `No companies found for industry: ${industry}` });
    } else {
      res.status(200).json({ companies });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/companies/revenue', async (req, res) => {
  const minRevenue = req.query.minRevenue;
  const maxRevenue = req.query.maxRevenue;
  try {
    const companies = await fetchCompaniesByRevenue(minRevenue, maxRevenue);
    if (companies.length === 0) {
      res.status(404).json({ error: `No companies found in revenue range: ${minRevenue} - ${maxRevenue}` });
    } else {
      res.status(200).json({ companies });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/companies/employees/:employeesCount', async (req, res) => {
  const employeesCount = req.params.employeesCount;
  try {
    const companies = await fetchCompaniesByEmployeesCount(employeesCount);
    if (companies.length === 0) {
      res.status(404).json({ error: `No companies found with less than ${employeesCount} employees` });
    } else {
      res.status(200).json({ companies });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/companies/founded_year/:foundedYear', async (req, res) => {
  const foundedYear = req.params.foundedYear;
  try {
    const companies = await fetchCompaniesByFoundedYear(foundedYear);
    if (companies.length === 0) {
      res.status(404).json({ error: `No companies found founded in the year: ${foundedYear}` });
    } else {
      res.status(200).json({ companies });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
