const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const doctor = require('./doctor');
const patient = require('./patient');


const Login = sequelize.define('Login', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  userType: {
    type: DataTypes.ENUM('doctor', 'patient'),
    allowNull: false,
  },
});

Login.belongsTo(doctor, { foreignKey: 'doctorId', constraints: false });
Login.belongsTo(patient, { foreignKey: 'patientId', constraints: false });

module.exports = Login;
