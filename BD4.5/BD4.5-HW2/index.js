const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3004;
let db;

(async () => {
  db = await open({
    filename: "BD4.5/BD4.5-HW2/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.5 HW2 Template" });
});

app.get('/employees/salary', async (req, res) => {
    const { minSalary } = req.query;
    try {
      let results = await filterEmployeesBySalary(minSalary);
      if (results.employees.length === 0) {
        return res.status(404).json({ error: "No employees found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const filterEmployeesBySalary = async (minSalary) => {
    let query = 'SELECT * FROM employees WHERE salary >= ?';
    let response = await db.all(query, [minSalary]);
    return { employees: response };
  };
  
  app.get('/employees/department-experience', async (req, res) => {
    const { department, minExperience } = req.query;
    try {
      let results = await filterEmployeesByDepartmentAndExperience(department, minExperience);
      if (results.employees.length === 0) {
        return res.status(404).json({ error: "No employees found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const filterEmployeesByDepartmentAndExperience = async (department, minExperience) => {
    let query = 'SELECT * FROM employees WHERE department = ? AND years_of_experience >= ?';
    let response = await db.all(query, [department, minExperience]);
    return { employees: response };
  };
  
  app.get('/employees/ordered-by-salary', async (req, res) => {
    try {
      let results = await fetchEmployeesOrderedBySalary();
      if (results.employees.length === 0) {
        return res.status(404).json({ error: "No employees found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchEmployeesOrderedBySalary = async () => {
    let query = 'SELECT * FROM employees ORDER BY salary DESC';
    let response = await db.all(query, []);
    return { employees: response };
  };

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
