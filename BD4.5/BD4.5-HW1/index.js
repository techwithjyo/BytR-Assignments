const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const app = express();
const PORT = process.env.PORT || 3003;
let db;

(async () => {
  db = await open({
    filename: "BD4.5/BD4.5-HW1/database.sqlite",
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.5 HW1 Template" });
});

app.get('/courses/rating', async (req, res) => {
    const { minRating } = req.query;
    try {
      let results = await filterCoursesByRating(minRating);
      if (results.courses.length === 0) {
        return res.status(404).json({ error: "No courses found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const filterCoursesByRating = async (minRating) => {
    let query = 'SELECT * FROM courses WHERE rating > ?';
    let response = await db.all(query, [minRating]);
    return { courses: response };
  };
  
  app.get('/courses/instructor-duration', async (req, res) => {
    const { instructor, minDuration } = req.query;
    try {
      let results = await filterCoursesByInstructorAndDuration(instructor, minDuration);
      if (results.courses.length === 0) {
        return res.status(404).json({ error: "No courses found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const filterCoursesByInstructorAndDuration = async (instructor, minDuration) => {
    let query = 'SELECT * FROM courses WHERE instructor = ? AND duration > ?';
    let response = await db.all(query, [instructor, minDuration]);
    return { courses: response };
  };
  
  app.get('/courses/ordered-by-price', async (req, res) => {
    try {
      let results = await fetchCoursesOrderedByPrice();
      if (results.courses.length === 0) {
        return res.status(404).json({ error: "No courses found" });
      }
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  const fetchCoursesOrderedByPrice = async () => {
    let query = 'SELECT * FROM courses ORDER BY price DESC';
    let response = await db.all(query, []);
    return { courses: response };
  };

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
