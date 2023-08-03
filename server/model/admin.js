const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Admin = sequelize.define('Admin', {
  email: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = Admin;