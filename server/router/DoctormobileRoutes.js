const express = require('express');
const doctorController = require('../controller/Mobile');
const patientController = require('../controller/Mobile');
const doctorsPatientsController = require('../controller/Mobile');

const router = express.Router();
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
router.get('/relationships/:id', doctorsPatientsController.getRelationshipById);

// Update a relationship by ID
router.put('/relationships/:id', doctorsPatientsController.updateRelationship);

// Delete a relationship by ID
router.delete('/relationships/:id', doctorsPatientsController.deleteRelationship);

module.exports = router;
