const { DataTypes, sequelize } = require("../lib/index");
const Chef = require("./chef.model");
const Dish = require("./dish.model");

const ChefDish = sequelize.define("ChefDish", {
  chefId: {
    type: DataTypes.INTEGER,
    references: {
      model: Chef,
      key: "id",
    },
  },
  dishId: {
    type: DataTypes.INTEGER,
    references: {
      model: Dish,
      key: "id",
    },
  },
});

Chef.belongsToMany(Dish, { through: ChefDish, foreignKey: "chefId" });
Dish.belongsToMany(Chef, { through: ChefDish, foreignKey: "dishId" });

module.exports = ChefDish;
