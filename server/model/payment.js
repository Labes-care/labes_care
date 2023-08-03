const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Doctor = require('./doctor');

const Payment = sequelize.define('Payment', {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cin: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  validation_cin: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  pay_type: {
    type: DataTypes.ENUM('monthly', 'quarterly', 'annual'),
    allowNull: false,
  },
});



module.exports = Payment;
