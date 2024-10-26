const { DataTypes } = require("sequelize");
const { sequelize } = require("../lib/index");
const User = require("./user.model");
const Track = require("./track.model");

const Like = sequelize.define("Like", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  trackId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Track,
      key: "id",
    },
  },
});

User.belongsToMany(Track, { through: Like, foreignKey: "userId" });
Track.belongsToMany(User, { through: Like, foreignKey: "trackId" });

module.exports = Like;
