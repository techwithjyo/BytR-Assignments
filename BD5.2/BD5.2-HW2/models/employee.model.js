const { DataTypes, sequelize } = require('../lib/index');

const Employee = sequelize.define('Employee', {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    department: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    designation: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  
  module.exports = Employee;