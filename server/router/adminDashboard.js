const router = require("express").Router();
const adminDashboard = require ('../controller/adminApproveReject/adminDashboard')


router.get("/DoctorList",adminDashboard.getAllDoctors) ;
router.get("/PatientList",adminDashboard.getAllPatients) ;
router.get('/appointmentList',adminDashboard.getAllAppointments);
router.delete('/deleteDoctor/:id',adminDashboard.deleteDoctor)

module.exports = router 