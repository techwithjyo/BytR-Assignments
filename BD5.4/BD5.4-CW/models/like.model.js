const { DataTypes, sequelize } = require("../lib/index");

const Like = sequelize.define("Like", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  trackId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Like;
