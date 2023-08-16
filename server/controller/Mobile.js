const Doctor = require('../model/doctor');
const Patient = require('../model/patient');
const DoctorsPatients = require('../model/DoctorsPatients');


//! Doctor  

const createDoctor = async (req, res) => {
  try {
    const newDoctor = await Doctor.create(req.body);
    res.status(201).json(newDoctor);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad request' });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (doctor) {
      res.json(doctor);
    } else {
        console.error(error);
      res.status(404).json({ error: 'Doctor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const [updatedRowsCount, updatedDoctor] = await Doctor.update(req.body, {
      where: { id: doctorId },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ error: 'Doctor not found' });
    } else {
      res.json(updatedDoctor[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad request' });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const deletedRowsCount = await Doctor.destroy({
      where: { id: doctorId },
    });
    if (deletedRowsCount === 0) {
      res.status(404).json({ error: 'Doctor not found' });
    } else {
      res.json({ message: 'Doctor deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Bad request' });
  }
};

//! Patient 

const createPatient = async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the patient.' });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching patients.' });
  }
};

const getPatientById = async (req, res) => {
  const patientId = req.params.id;

  try {
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      res.status(404).json({ error: 'Patient not found.' });
    } else {
      res.status(200).json(patient);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the patient.' });
  }
};

const updatePatient = async (req, res) => {
  const patientId = req.params.id;

  try {
    const [updatedRowsCount, updatedPatient] = await Patient.update(req.body, {
      where: { id: patientId },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      res.status(404).json({ error: 'Patient not found.' });
    } else {
      res.status(200).json(updatedPatient[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the patient.' });
  }
};

const deletePatient = async (req, res) => {
  const patientId = req.params.id;

  try {
    const deletedRowCount = await Patient.destroy({
      where: { id: patientId },
    });

    if (deletedRowCount === 0) {
      res.status(404).json({ error: 'Patient not found.' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the patient.' });
  }
};

//! relation 


// Create a new relationship between a doctor and a patient
const createRelationship = async (req, res) => {
  const { doctors_iddoctors, patients_idpatients } = req.body;

  try {
    const newRelationship = await DoctorsPatients.create({ doctors_iddoctors, patients_idpatients });
    res.status(201).json(newRelationship);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while creating the relationship.' });
  }
};

// Get all relationships
const getAllRelationships = async (req, res) => {
  try {
    const relationships = await DoctorsPatients.findAll();
    res.status(200).json(relationships);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching relationships.' });
  }
};

// Get a relationship by ID
const getRelationshipById = async (req, res) => {
  const { doctors_iddoctors, patients_idpatients } = req.params;

  try {
    const relationship = await DoctorsPatients.findOne({
      where: { doctors_iddoctors, patients_idpatients }
    });

    if (!relationship) {
      res.status(404).json({ error: 'Relationship not found.' });
    } else {
      res.status(200).json(relationship);
    }
  } catch (error) {
    console.error('Error fetching relationship:', error); // Log the actual error
    res.status(500).json({ error: 'An error occurred while fetching the relationship.' });
  }
};


// Update a relationship by ID
const updateRelationship = async (req, res) => {
  const relationshipId = req.params.id;

  try {
    const [updatedRowsCount, updatedRelationship] = await DoctorsPatients.update(req.body, {
      where: { id: relationshipId },
      returning: true,
    });

    if (updatedRowsCount === 0) {
      res.status(404).json({ error: 'Relationship not found.' });
    } else {
      res.status(200).json(updatedRelationship[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the relationship.' });
  }
};

// Delete a relationship by ID
const deleteRelationship = async (req, res) => {
  const relationshipId = req.params.id;

  try {
    const deletedRowCount = await DoctorsPatients.destroy({
      where: { id: relationshipId },
    });

    if (deletedRowCount === 0) {
      res.status(404).json({ error: 'Relationship not found.' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the relationship.' });
  }
};


module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  createPatient,
  deletePatient,
  updatePatient,
  getPatientById,
  getAllPatients,
  deleteRelationship,
  updateRelationship,
  getRelationshipById,
  getAllRelationships,
  createRelationship
};
