const { DataTypes, sequelize } = require('../lib/index');

const Company = sequelize.define('Company', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  industry: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  foundedYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  headquarters: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  revenue: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Company;