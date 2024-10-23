const { DataTypes, sequelize } = require("../lib/index");

const Chef = sequelize.define("Chef", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Chef;
