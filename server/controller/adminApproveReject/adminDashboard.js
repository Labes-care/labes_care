const Admin = require('../../model/admin')
const Patient = require('../../model/patient')
const Doctor = require('../../model/doctor')
const DoctorsPatients = require ('../../model/DoctorsPatients') 

const getAllDoctors = function (req, res) {
    Doctor.findAll({})
      .then((doctors) => {
        res.status(200).json(doctors);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ err: 'No doctor found' })
      })
  }



const deleteDoctor = function (req, res) {
    Doctor.destroy({
      where: {
        id: req.params.id
      }
    })
      .then((results) => {
        res.status(200).send(results);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }

  const getAllPatients = function (req, res) {
    Patient.findAll({})
      .then((doctors) => {
        res.status(200).json(doctors);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ err: 'No doctor found' })
      })
  }

  const getAllAppointments = function (req, res) {
    DoctorsPatients.findAll({})
      .then((doctors) => {
        res.status(200).json(doctors);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ err: 'No doctor found' })
      })
  }





module.exports = {getAllDoctors,getAllPatients,getAllAppointments,deleteDoctor}