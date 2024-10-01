const { DataTypes, sequelize } = require('../lib/index');

const Track = sequelize.define('track', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  artist: { 
    type: DataTypes.TEXT,
    allowNull: false,
  },
  album: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  genre: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Track;