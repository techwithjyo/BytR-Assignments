const { DataTypes, sequelize } = require("../lib/index");
const Student = require("./student.model");
const Course = require("./course.model");

const StudentCourse = sequelize.define("StudentCourse", {
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: "id",
    },
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: "id",
    },
  },
});

Student.belongsToMany(Course, {
  through: StudentCourse,
  foreignKey: "studentId",
});
Course.belongsToMany(Student, {
  through: StudentCourse,
  foreignKey: "courseId",
});

module.exports = StudentCourse;
