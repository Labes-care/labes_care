
const sequelize = require('../database/db');

const admin = require ('./admin')
const doctor = require('./doctor');
const patient = require('./patient');
const payment = require('./payment');
const DoctorsPatients = require('./DoctorsPatients');
const chatDocPatient = require('./chatDocPatient')

doctor.hasMany(patient, { as: 'patients', foreignKey: 'doctors_iddoctors' })
doctor.hasMany(payment, { as: 'payments', foreignKey: 'doctors_iddoctors' });
patient.belongsTo(doctor, { as: 'doctor', foreignKey: 'doctors_iddoctors' })
payment.belongsTo(doctor, { as: 'doctor', foreignKey: 'doctors_iddoctors' });

doctor.belongsToMany(patient, { through: DoctorsPatients, foreignKey: 'doctors_iddoctors' });
patient.belongsToMany(doctor, { through: DoctorsPatients, foreignKey: 'patients_idpatients' });

chatDocPatient.belongsTo(doctor,{as:"doctor" , foreignKey:'doctorId'})
chatDocPatient.belongsTo(patient,{as:"patient" , foreignKey:'patientId'})


module.exports=sequelize