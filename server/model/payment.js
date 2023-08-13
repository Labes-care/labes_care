const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Doctor = require('./doctor');

const Payment = sequelize.define('Payment', {
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  expirationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  pay_type: {
    type: DataTypes.ENUM('monthly', 'quarterly', 'annual'),
    allowNull: false,
  },
});



module.exports = Payment;
