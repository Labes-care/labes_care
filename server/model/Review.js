const {  DataTypes } = require('sequelize');
const sequelize = require('../configdb');

const {Doctor} = require("./doctor")
const {Patient} = require("./patient")

const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  
  });
  
  Doctor.hasMany(Review, { foreignKey: 'Doctor_id' });
  Review.belongsTo(Doctor, { foreignKey: 'Doctor_id' });
  
  Patient.hasMany(Review,{foreignKey:'Patient_id'});
  Review.belongsTo(Doctor, {foreignKey: 'Doctor_id' });


module.exports = { Review };