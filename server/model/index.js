
const sequelize = require('../database/db');

const admin = require ('./admin')
const doctor = require('./doctor');
const patient = require('./patient');
const payment = require('./payment');
const DoctorsPatients = require('./DoctorsPatients');
const Appointment = require('./Appointment')

const event =require('./event')





doctor.hasMany(payment, { as: 'payments', foreignKey: 'doctors_iddoctors' });

payment.belongsTo(doctor, { as: 'doctor', foreignKey: 'doctors_iddoctors' });



// doctor and patient relation
doctor.belongsToMany(patient, {
    through: DoctorsPatients,
    foreignKey: "doctors_iddoctors",
    otherKey: "patients_idpatients",
    as: "patients",
  });
  patient.belongsToMany(doctor, {
    through: DoctorsPatients,
    foreignKey: "patients_idpatients",
    otherKey: "doctors_iddoctors",
    as: "doctors",
  });
  DoctorsPatients.belongsTo(doctor, { foreignKey: 'doctors_iddoctors' });
DoctorsPatients.belongsTo(patient, { foreignKey: 'patients_idpatients' });





event.belongsTo(doctor, { as: 'doctor', foreignKey: 'doctors_iddoctors' });


module.exports=sequelize