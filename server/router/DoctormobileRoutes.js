const express = require('express');
const router = express.Router();

const doctorController = require('../controller/Mobile');
const patientController = require('../controller/Mobile');
const doctorsPatientsController = require('../controller/Mobile');

const authMiddleware = require('../middlewear/authMiddleware');
const { register, login } = require('../controller/authControllerMobile');

//! doctor 
// Create a new doctor
router.post('/doctors', doctorController.createDoctor);

// Get all doctors
router.get('/doctors', doctorController.getAllDoctors);

// Get a single doctor by ID
router.get('/doctors/:id', doctorController.getDoctorById);

// Update doctor's information
router.put('/doctors/:id', doctorController.updateDoctor);

// Delete a doctor by ID
router.delete('/doctors/:id', doctorController.deleteDoctor);

//! patient 
// Create a new patient
router.post('/patients', patientController.createPatient);

// Get all patients
router.get('/patients', patientController.getAllPatients);

// Get a patient by ID
router.get('/patients/:id', patientController.getPatientById);

// Update a patient by ID
router.put('/patients/:id', patientController.updatePatient);

// Delete a patient by ID
router.delete('/patients/:id', patientController.deletePatient);

//! relation 

// Create a new relationship
router.post('/relationships', doctorsPatientsController.createRelationship);

// Get all relationships
router.get('/relationships', doctorsPatientsController.getAllRelationships);

// Get a relationship by ID
router.get('/relationships/:doctors_iddoctors/:patients_idpatients', doctorsPatientsController.getRelationshipById);

// Update a relationship by ID
router.put('/relationships/:id', doctorsPatientsController.updateRelationship);

// Delete a relationship by ID
router.delete('/relationships/:id', doctorsPatientsController.deleteRelationship);

//! login


// Public route: Register a new patient
router.post('/register', register);

// Public route: Log in a patient
router.post('/login', login);

// Protected route: Example of a route that requires authentication
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Authenticated route', patientId: req.patient.id });
});

module.exports = router;

module.exports = router;
