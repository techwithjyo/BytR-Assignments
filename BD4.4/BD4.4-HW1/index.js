const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3000;
let db;

(async () => {
  db = await open({
    filename: "BD4.4/BD4.4-HW1/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.4 HW1 Template" });
});

const fetchAllCourses = async () => {
  return await db.all("SELECT id, title, release_year FROM courses");
};

const fetchCoursesByInstructor = async (instructor) => {
  return await db.all(
    "SELECT id, title, instructor, category FROM courses WHERE instructor = ?",
    instructor,
  );
};

const fetchCoursesByCategory = async (category) => {
  return await db.all(
    "SELECT id, title, release_year, category FROM courses WHERE category = ?",
    category,
  );
};

const fetchCoursesByYear = async (year) => {
  return await db.all(
    "SELECT id, title, release_year, category FROM courses WHERE release_year = ?",
    year,
  );
};

app.get("/courses", async (req, res) => {
  try {
    const courses = await fetchAllCourses();
    if (courses.length === 0) {
      return res.status(404).json({ error: "No courses found" });
    }
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/courses/instructor/:instructor", async (req, res) => {
  try {
    const instructor = req.params.instructor;
    const courses = await fetchCoursesByInstructor(instructor);
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ error: "No courses found for the specified instructor" });
    }
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/courses/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const courses = await fetchCoursesByCategory(category);
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ error: "No courses found for the specified category" });
    }
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/courses/year/:year", async (req, res) => {
  try {
    const year = req.params.year;
    const courses = await fetchCoursesByYear(year);
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ error: "No courses found for the specified year" });
    }
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
