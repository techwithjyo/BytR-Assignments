const { DataTypes, sequelize } = require("../lib/index");

const Dish = sequelize.define("Dish", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cuisine: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preparationTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Dish;
