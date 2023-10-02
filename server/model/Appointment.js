const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');


const Appointment = sequelize.define('Appointment', {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  message: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  checked: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
});



module.exports = Appointment;
