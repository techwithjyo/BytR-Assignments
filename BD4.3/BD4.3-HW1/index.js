const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3001;
let db;

(async () => {
  db = await open({
    filename: "BD4.3/BD4.3-HW1/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3 HW1 Template" });
});

const filterByGender = async (gender) => {
  return await db.all('SELECT * FROM employees WHERE gender = ?', [gender]);
};

const filterByDepartment = async (department) => {
  return await db.all('SELECT * FROM employees WHERE department = ?', [department]);
};

const filterByJobTitle = async (jobTitle) => {
  return await db.all('SELECT * FROM employees WHERE job_title = ?', [jobTitle]);
};

const filterByLocation = async (location) => {
  return await db.all('SELECT * FROM employees WHERE location = ?', [location]);
};

app.get('/employees/gender/:gender', async (req, res) => {
  const gender = req.params.gender;
  try {
    const employees = await filterByGender(gender);
    if (employees.length === 0) {
      res.status(404).json({ error: `No employees found for gender: ${gender}` });
    } else {
      res.status(200).json({ employees });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/employees/department/:department', async (req, res) => {
  const department = req.params.department;
  try {
    const employees = await filterByDepartment(department);
    if (employees.length === 0) {
      res.status(404).json({ error: `No employees found for department: ${department}` });
    } else {
      res.status(200).json({ employees });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/employees/job_title/:job_title', async (req, res) => {
  const jobTitle = req.params.job_title;
  try {
    const employees = await filterByJobTitle(jobTitle);
    if (employees.length === 0) {
      res.status(404).json({ error: `No employees found for job title: ${jobTitle}` });
    } else {
      res.status(200).json({ employees });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/employees/location/:location', async (req, res) => {
  const location = req.params.location;
  try {
    const employees = await filterByLocation(location);
    if (employees.length === 0) {
      res.status(404).json({ error: `No employees found for location: ${location}` });
    } else {
      res.status(200).json({ employees });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
