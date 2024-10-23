const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./lib/index");
const Student = require("./models/student.model");
const Course = require("./models/course.model");
const StudentCourse = require("./models/studentCourse.model");

const app = express();
const port = 3000;
app.use(bodyParser.json());

const dummyCourses = [
  { title: "Math 101", description: "Basic Mathematics" },
  { title: "History 201", description: "World History" },
  { title: "Science 301", description: "Basic Sciences" },
];

const dummyStudents = [{ name: "John Doe", age: 24 }];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await Course.bulkCreate(dummyCourses);
    await Student.bulkCreate(dummyStudents);
    res.status(200).send("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    res.status(500).send("Error seeding database");
  }
});

app.post("/students/new", async (req, res) => {
  const newStudent = req.body.newStudent;
  if (!newStudent) {
    return res
      .status(400)
      .json({ error: "newStudent is required in the request body" });
  }
  try {
    const student = await Student.create(newStudent);
    res.status(201).json({ newStudent: student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/students/update/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const newStudentData = req.body;
  try {
    await Student.update(newStudentData, { where: { id } });
    const updatedStudent = await Student.findByPk(id);
    res.status(200).json({
      message: "Student updated successfully",
      updatedStudent: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
