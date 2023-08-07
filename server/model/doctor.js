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
    type: DataTypes.STRING(300),
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
  profile_img:{
    type: DataTypes.STRING(300),
    allowNull: false
  },
  cover_img:{
    type: DataTypes.STRING(300),
    allowNull: false
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  availability: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
});


module.exports = Doctor;