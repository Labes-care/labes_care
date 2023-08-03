const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Patient = require('./patient')
const Payment = require ('./payment')

const Doctor = sequelize.define('Doctor', {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  speciality: {
    type: DataTypes.ENUM('Neurology', 'Cardiology', 'Dermatology', 'dentistry', 'orthopedic', 'ophthalmology', 'Pulmonology'),
    allowNull: false,
  },
  cin: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  certificate_img: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  phonenumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  availability: {
    type: DataTypes.TINYINT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});


module.exports = Doctor;
