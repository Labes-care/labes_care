const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Doctor = require('./doctor')

const Patient = sequelize.define('Patient', {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATEONLY,
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
  }
});



module.exports = Patient;
