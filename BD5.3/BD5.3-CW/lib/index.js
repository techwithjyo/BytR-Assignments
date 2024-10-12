const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("sqlite:./database.sqlite");

module.exports = { DataTypes, sequelize };
